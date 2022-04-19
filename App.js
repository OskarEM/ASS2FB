import { StatusBar } from 'expo-status-bar';
import { deleteDoc, doc, getDoc, setDoc, collection,
    getDocs,
    addDoc,
    updateDoc, } from 'firebase/firestore';
import { relative } from 'path';
import {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import DatieField, {
    MonthDateYearField,
    YearMonthDateField,
} from 'react-native-datefield';
import { styles } from './component/styles';
import { Chart } from './component/Chart';
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component';

// Using DB Reference
import { db } from './Core/Config'


export default function App()  {

  // Storing User Data
  
    const [modalAddPost, setModalAddPost] = useState(false); //Decide the visibility of modal Add Entry
    const [modalDeletePost, setModalDeletePost] = useState(false); //Decide the visibility of modal Delete Entry
    const [modalChartPost, setModalChartPost] = useState(false); //Decide the visibility of modal Chart Entry
  // Update Text
  
  

 

    const initialFormState = { id: null, classID: '', fName: '',lName: '', DOB: '', className: '', Score: null, Grade: '' }

    // Setting state
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const [grade_num, setGrade_num] = useState([])
    const [grade_course, setCourse_grade] = useState([]);
    const [textclassID, setTextclassID] = useState("")
    const [textfName, setTextfName] = useState("")
    const [textlName, setTextlName] = useState("")
    const [textDOB, setTextDOB] = useState("")
    const [textclassName, setTextclassName] = useState("")
    const [textScore, setTextScore] = useState(null)
    const [textGrade, setTextGrade] = useState("")
    const [CurrentStudent, setCurrentStudent] = useState("")
    const [FirstLoad, setFirstLoad] = useState(0)

    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1
        addDoc(usersCollectionRef, user);
    }

    const deleteUser = async (id) => {
        console.log(id)
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    };


    const updateUser = (id, updatedUser) => {
        console.log(id)
        console.log(updateUser)
        const userDoc = doc(db, "users", id);
        updateDoc(userDoc, updatedUser);
    };



    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, [usersCollectionRef]);

    useEffect(() => {
        if(modalChartPost == true){
            setFirstLoad(!FirstLoad)
        }
    },[modalChartPost]);

    useEffect(() => {
        setGrade_num([])
        setCourse_grade([])
        for (const student of users) {
            setCourse_grade(oldArray => [...oldArray, new Object({Grade : student.Grade,className: student.className})])
        }

       const result = grade_course.reduce((acc, item) => {

           if (acc[item.className]) {
               acc[item.className].push(item.Grade);
            } else {

                acc[item.className] = [item.Grade];
            }

            return acc;
        }, {});

        let object = {}
        for (let course in result) {
            object[course] = [0, 0, 0, 0, 0, 0];
            for (let i = 0; i < course.length; i++) {
                switch (result[course][i]) {
                    case 'A':
                        object[course][0]++;
                        break;
                    case 'B':
                        object[course][1]++;
                        break;
                    case 'C':
                        object[course][2]++;
                        break;
                    case 'D':
                        object[course][3]++;
                        break;
                    case 'E':
                        object[course][4]++;
                        break;
                    case 'F':
                        object[course][5]++;
                        break;
                }
            }
        }

        console.log(object)

        for (const key in object){
            setGrade_num(oldArray => [...oldArray,  <Chart key={key} course={key} data={object[key]}/>])

        }
        console.log(grade_num)
    }, [modalChartPost, FirstLoad])


    const CONTENT = {
        tableHead: ['ClassId', 'fName', 'lName', 'DOB','className','Score','Grade',''],
        
      }; 
          const tableData = [];
          const tableTitle = [];
      
          const element = (data, index) => (
            <View>
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
              </View>
            </TouchableOpacity></View>
          );
          let array = []
            for(let a = 0; a <users.length; a += 1){
                array.push(users[a].classID)
                array.push(users[a].fName)
                array.push(users[a].lName)
                array.push(users[a].DOB)
                array.push(users[a].className)
                array.push(users[a].Score)
                array.push(users[a].Grade)
                array.push(users[a].id)
                
            }
          
      
          for (let i = 0; i < users.length; i += 1) { //Amount of rows
            const rowData = [];
            tableTitle.push(element)
            for (let j = 0; j < 8; j += 1) { //amount of cells
              rowData.push(array[j]);
              
            }
            for (let j = 0; j < 8; j += 1) { //amount of cells
               array.shift() 
              }
            tableData.push(rowData);
          }
      
   
  return (
    <View style={styles.container1}>
        <View style={styles.row}>
            <View>
            
                </View>


            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={CONTENT.tableHead} style={styles.head} textStyle={styles.text} />
                    
                    {tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.wrapper}>
                        {rowData.map((cellData, cellIndex) => (
                            <Cell
                            key={cellIndex}
                            data={cellIndex === 7 ? 
                                <Button style={styles.btn} 
                                onPress={() => {setModalDeletePost(!modalDeletePost) + setCurrentStudent(cellData)}} 
                                title="Edit/Delete"
                                />
                            
                            : cellData}
                            textStyle={styles.text}
                            />
                        ))}
                        
                        </TableWrapper>
                        
                    ))}
                    
                    
                </Table>

               
      <Button title='+' style={styles.Texty} onPress={() =>  setModalAddPost(!modalAddPost)}></Button>
      <Button title='Show charts' style={styles.Texty} onPress={() =>  setModalChartPost(!modalChartPost)}></Button>

            <Modal animationType="slide"
                   transparent={false}
                   visible={modalAddPost}
                   onRequestClose={() => {
                       setModalAddPost(!modalAddPost);
                   }}
            >
                <View>
                    <View style = {styles.container}>
                        <Text style={styles.headline}>Add Entry</Text>
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='classID'
                            value={textclassID}
                            onChangeText={(textclassID) => { setTextclassID(textclassID) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='First Name'
                            value={textfName}
                            onChangeText={(textfName) => { setTextfName(textfName) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='Last Name'
                            value={textlName}
                            onChangeText={(textlName) => { setTextlName(textlName) }}
                        />

                        <MonthDateYearField
                            labelDate="D"
                            labelMonth="M"
                            labelYear="Y"
                            containerStyle={styles.inputBackground}
                            onSubmit={(value) => setTextDOB(value.getDate() + "-" + (value.getMonth()+1) + "-"
                                + value.getFullYear())
                                }
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='class Name'
                            value={textclassName}
                            onChangeText={(textclassName) => { setTextclassName(textclassName) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='Score'
                            value={textScore}
                            onChangeText={(textScore) => { setTextScore(parseInt(textScore)) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='Grade'
                            value={textGrade}
                            onChangeText={(textGrade) => { setTextGrade(textGrade) }}
                        />



                        <Button title='Add' style = {styles.submitButton} onPress={() => {
                            setModalAddPost(!modalAddPost),
                            addUser({"classID": textclassID, "fName": textfName, "lName": textlName, "DOB": textDOB,
                            "className": textclassName, "Score": textScore, "Grade": textGrade}),
                            setTextclassID(""), setTextfName(""), setTextlName(""), setTextDOB(""),
                             setTextclassName(""), setTextScore(null), setTextGrade("")
                        }}
                        />
                        <Button  title='Cancel' style = {styles.submitButton} onPress={()=> setModalAddPost(!modalAddPost)}/>
                    </View>
                </View>
            </Modal>
        

            <Modal animationType="slide"
                   transparent={false}
                   visible={modalDeletePost}
                   onRequestClose={() => {
                       setModalDeletePost(!modalDeletePost);
                   }}
            >
                <View>
                    <View style = {styles.container}>
                        <Text style={styles.headline}>Edit Entry</Text>
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='classID'
                            value={textclassID}
                            onChangeText={(textclassID) => { setTextclassID(textclassID) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='First Name'
                            value={textfName}
                            onChangeText={(textfName) => { setTextfName(textfName) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='Last Name'
                            value={textlName}
                            onChangeText={(textlName) => { setTextlName(textlName) }}
                        />

                        <MonthDateYearField
                            labelDate="D"
                            labelMonth="M"
                            labelYear="Y"
                            containerStyle={styles.inputBackground}
                            onSubmit={(value) => setTextDOB(value.getDate() + "-" + (value.getMonth()+1) + "-"
                                + value.getFullYear())
                                }
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='class Name'
                            value={textclassName}
                            onChangeText={(textclassName) => { setTextclassName(textclassName) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='Score'
                            value={textScore}
                            onChangeText={(textScore) => { setTextScore(parseInt(textScore)) }}
                        />
                        <TextInput style = {styles.textInput}
                            autoCapitalize = "words"
                            placeholder='Grade'
                            value={textGrade}
                            onChangeText={(textGrade) => { setTextGrade(textGrade) }}
                        />

                        <Button title='Delete' style = {styles.submitButton} onPress={() => {
                            setModalDeletePost(!modalDeletePost),
                            deleteUser(CurrentStudent)
                        }}
                        />

                        <Button title='Edit' style = {styles.submitButton} onPress={() => {
                            setModalDeletePost(!modalDeletePost),
                            updateUser(CurrentStudent,{"classID": textclassID, "fName": textfName, "lName": textlName, "DOB": textDOB,
                            "className": textclassName, "Score": textScore, "Grade": textGrade})
                        }}
                        />
                        <Button  title='Cancel' style = {styles.submitButton} onPress={()=> setModalDeletePost(!modalDeletePost)}/>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide"
                   transparent={false}
                   visible={modalChartPost}
                   onLayout
                   onRequestClose={() => {
                       setModalChartPost(!modalChartPost);
                   }}
            >
                
                <ScrollView>
                <Button  title='Cancel' style = {styles.submitButton} onPress={()=> setModalChartPost(!modalChartPost)}/>
                    {grade_num}
                <Button  title='Cancel' style = {styles.submitButton} onPress={()=> setModalChartPost(!modalChartPost)}/> 
                </ScrollView>
                    </Modal>
        </View>

    </View>
  );
   
}



function CRUD(props){
    return(
        <View>
            <Text> {props.post.fName}</Text>
        </View>
    )

}




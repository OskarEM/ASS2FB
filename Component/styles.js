import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        top: 35, // Makes everything appear vertically bellow status bar on mobile
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: { 
        height: 40, 
        backgroundColor: 'grey' 
    },
    text: { 
        textAlign: 'center' 
    },
    wrapper: { 
        flexDirection: 'row' 
    },
    title: { 
        flex: 1, backgroundColor: '#2ecc71' 
    },
    row: { 
        height: 28    
    },
    
    Texty: {
          fontSize: 30,
          fontWeight: "bold",
          width:100,
          bottom:100,
          left:0,
          
    },

    listButton:{
        flexDirection: 'column',
        margin: 8,
        justifyContent: 'center',
    },
    inputBackground: {
        borderRadius: 10,
        backgroundColor: '#f1f1f4',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    inputBorder: {
        width: '30%',
        borderRadius: 8,
        borderColor: '#cacaca',
        borderWidth: 1,
        marginBottom: 20,
    },
    postContainer: {
        flexDirection: 'col',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#a6d2f5',
        marginVertical: 1,
        paddingHorizontal: 7,
        paddingVertical: 5
    },
    postText: {
        fontSize: 16
    },
    addButton: {
        backgroundColor: "#003366",
        margin: 0,
        padding: 0,
        height: '5%',
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 35,
    },
    addButtonText: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    textInput: {
        width: '95%',
        fontSize: 18,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
        marginVertical: 20
    },
    headline: {
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    currentList: {
        fontSize: 16,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    input: {
        margin: 15,
        height: 100,
        borderColor: '#7a42f4',
        borderWidth: 3
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        width: 300,
        color: "black"
    },
    submitButtonText:{
        color: 'white'
    },

});

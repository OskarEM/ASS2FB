import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
        apiKey: "AIzaSyDH48GGZOGfZtzo2TTQ5NPIyNEMv3yJJPE",
        authDomain: "ass2nr3.firebaseapp.com",
        projectId: "ass2nr3",
        storageBucket: "ass2nr3.appspot.com",
        messagingSenderId: "670804480999",
        appId: "1:670804480999:web:e302a6814ec9a242552342",
        measurementId: "G-4DJ2WT8EDN"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference

export const db = getFirestore(app);

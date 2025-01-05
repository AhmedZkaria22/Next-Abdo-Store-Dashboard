import { initializeApp } from 'firebase/app' 
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCAimAP6y8xotXnD10D0_77o8A1J7Em6CU",
    authDomain: "abdo-app-98e08.firebaseapp.com",
    projectId: "abdo-app-98e08",
    storageBucket: "abdo-app-98e08.appspot.com",
    messagingSenderId: "815571317134",
    appId: "1:815571317134:web:0d163d76873b6a47a3b4df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);



// firebase.initializeApp(firebaseConfig);

// export default firebase;  
// export const db = firebase.firestore();
// export const auth = firebase.auth();
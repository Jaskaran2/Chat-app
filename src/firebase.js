import firebase from "firebase";

var firebaseConfig = {
   apiKey: "AIzaSyDKoq5rqU73fJAfHmdfhRH5L9gTjzUXNiM",
   authDomain: "whatsapp-clone-59fa6.firebaseapp.com",
   projectId: "whatsapp-clone-59fa6",
   storageBucket: "whatsapp-clone-59fa6.appspot.com",
   messagingSenderId: "619109395261",
   appId: "1:619109395261:web:fcaf32c06c6eb5623f3354",
   measurementId: "G-3MYDZQXL6J"
 };

 
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

const storage=firebase.storage();

export {auth,provider,storage};
export default db;


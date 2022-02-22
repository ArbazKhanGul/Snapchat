
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeOPyy-flZourEwX4WgYBwqOEtn0TXWcc",
  authDomain: "snapchat-2043f.firebaseapp.com",
  projectId: "snapchat-2043f",
  storageBucket: "snapchat-2043f.appspot.com",
  messagingSenderId: "1095643850714",
  appId: "1:1095643850714:web:e08a38d549afaa473782e3",
  measurementId: "G-GEB2HCXDMX"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
const storage=firebaseApp.storage();
const provider=new firebase.auth.GoogleAuthProvider();

export {db,auth,storage,provider};


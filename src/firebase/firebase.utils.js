import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyD_e2hxPiTPOzq55lXTOfGI4HftiIvL8MM",
    authDomain: "crwd-db-f2277.firebaseapp.com",
    databaseURL: "https://crwd-db-f2277.firebaseio.com",
    projectId: "crwd-db-f2277",
    storageBucket: "",
    messagingSenderId: "613256687038",
    appId: "1:613256687038:web:399f4e5f958f73dc93ddef"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
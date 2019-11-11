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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;

  export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
      const collectionRef = firestore.collection(collectionKey);

      const batch = firestore.batch();
      objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(obj.title);
        batch.set(newDocRef, obj);
      });

      return await batch.commit();
  }


  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    });
  }


  export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {

    const transfomedCollection = collectionsSnapshot.docs.map(docSnapshot => {
        const { title, items } = docSnapshot.data();

        return {
          routeName: encodeURI(title.toLowerCase()),
          id: docSnapshot.id,
          title, 
          items
        }
    })

    return transfomedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
  }
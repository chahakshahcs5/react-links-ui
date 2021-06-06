import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC9Mc3KTvoQOXbxdtFjqryqn5cBwoSghzk",
  authDomain: "links-a28ea.firebaseapp.com",
  projectId: "links-a28ea",
  storageBucket: "links-a28ea.appspot.com",
  messagingSenderId: "558706434933",
  appId: "1:558706434933:web:31cb8c7fc168e2fbc6e93c",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db };

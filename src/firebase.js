import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCjdhQB3TNCRBcoeCh32Gs5W7lgOVkTXMY",
    authDomain: "react-slack-clone-68ad2.firebaseapp.com",
    databaseURL: "https://react-slack-clone-68ad2.firebaseio.com",
    projectId: "react-slack-clone-68ad2",
    storageBucket: "react-slack-clone-68ad2.appspot.com",
    messagingSenderId: "404684949406",
    appId: "1:404684949406:web:6ece58bf4e927932e8f88f",
    measurementId: "G-8JRS5LS7JJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
import firebase from "firebase";
import "firebase/database";

if (!firebase.apps.length) {
  var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0lmZ4xLYr6XJrJCpc6_3dk4OkpO5HTqQ",
    authDomain: "chat-react-a4410.firebaseapp.com",
    projectId: "chat-react-a4410",
    storageBucket: "chat-react-a4410.appspot.com",
    messagingSenderId: "362397087149",
    appId: "1:362397087149:web:be483f08a44a0b31aa5d24",
  });
}

export default firebaseApp;

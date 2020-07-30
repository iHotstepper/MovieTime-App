  import firebase from 'firebase'
  // import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBDvUeWp1b_mC11-MUjrItIbYXeHucFkyI",
    authDomain: "movietime-c1a14.firebaseapp.com",
    databaseURL: "https://movietime-c1a14.firebaseio.com",
    projectId: "movietime-c1a14",
    storageBucket: "movietime-c1a14.appspot.com",
    messagingSenderId: "623607973980",
    appId: "1:623607973980:web:ba055933c75e59164fbe99"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()
  
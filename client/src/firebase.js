  // Initialize Firebase
  const firebase = require('firebase')

  var config = {
    apiKey: "AIzaSyBb2AFaUiR-sCI7hsflmSkpk5_90_Hvv_g",
    authDomain: "hacktiv-overflow-1ab2b.firebaseapp.com",
    databaseURL: "https://hacktiv-overflow-1ab2b.firebaseio.com",
    projectId: "hacktiv-overflow-1ab2b",
    storageBucket: "hacktiv-overflow-1ab2b.appspot.com",
    messagingSenderId: "111180430908"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.FacebookAuthProvider()

  var auth = firebase.auth()

  export { provider, auth }
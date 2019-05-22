var admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
// const FIREBASE_API_KEY = require("../serviceFirebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://autodispenser-de64e.firebaseio.com"
});

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase");

// Add the Firebase products that you want to use

var firebaseConfig = {
  apiKey: "AIzaSyAcZzq7B-iLvfHCS2EthACEE1tZp-7e-40",
  authDomain: "autodispenser-de64e.firebaseapp.com",
  databaseURL: "https://autodispenser-de64e.firebaseio.com",
  projectId: "autodispenser-de64e",
  storageBucket: "autodispenser-de64e.appspot.com",
  messagingSenderId: "637755215079",
  appId: "1:637755215079:web:49a24792a4a9faed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

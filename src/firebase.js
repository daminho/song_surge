// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLwip2thVYGIyDcjL0zJ-8iY5m9v_Y8VU",
  authDomain: "song-surge.firebaseapp.com",
  databaseURL: "https://song-surge-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "song-surge",
  storageBucket: "song-surge.appspot.com",
  messagingSenderId: "1064758627923",
  appId: "1:1064758627923:web:cb351463008e8b422cc0a6",
  measurementId: "G-DC5H8NW49M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
import Rebase from 're-base';
import firebase from 'firebase';

// created firebase app
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDJub4FyvUTtj_EoU9SHpJ9SW4jGcIfPMM",
  authDomain: "catch-of-the-day-fredo-picazo.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-fredo-picazo.firebaseio.com",
  projectId: "catch-of-the-day-fredo-picazo",
  storageBucket: "catch-of-the-day-fredo-picazo.appspot.com",
  messagingSenderId: "287459635820",
  appId: "1:287459635820:web:34ffdd895ed338d0305e49",
  measurementId: "G-0DLJFTRWZ2"
});

// created our database bindings
const base = Rebase.createClass(firebaseApp.database());
// this is a named export
// import formatPrice is an example of a named export
export { firebaseApp };
// this is a default export
export  default base;

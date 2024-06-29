// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLvDwSes1bpeeSevgyc6Dm089y_lFdKs8",
  authDomain: "appreactnative-9c197.firebaseapp.com",
  projectId: "appreactnative-9c197",
  storageBucket: "appreactnative-9c197.appspot.com",
  messagingSenderId: "516524460666",
  appId: "1:516524460666:web:30554134611ebb5e8149c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByoYQNLsGdwuolqMzJFPTyUE5iRQB6Y6U",
  authDomain: "watchlist-picker.firebaseapp.com",
  projectId: "watchlist-picker",
  storageBucket: "watchlist-picker.firebasestorage.app",
  messagingSenderId: "469051275468",
  appId: "1:469051275468:web:d2730dc533a1dc63632a69",
  measurementId: "G-1SC69TN9C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
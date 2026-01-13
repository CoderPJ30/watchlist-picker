import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByoYQNLsGdwuolqMzJFPTyUE5iRQB6Y6U",
  authDomain: "watchlist-picker.firebaseapp.com",
  projectId: "watchlist-picker",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

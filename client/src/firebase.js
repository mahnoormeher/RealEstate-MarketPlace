// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-marketplace-c4da8.firebaseapp.com",
  projectId: "realestate-marketplace-c4da8",
  storageBucket: "realestate-marketplace-c4da8.firebasestorage.app",
  messagingSenderId: "78966322330",
  appId: "1:78966322330:web:d3244e3df502933f0e1b23",
  measurementId: "G-VJDTTEYGNQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
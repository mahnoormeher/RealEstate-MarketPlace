import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-marketplace-c4da8.firebaseapp.com",
  projectId: "realestate-marketplace-c4da8",
  storageBucket: "realestate-marketplace-c4da8.appspot.com", 
  messagingSenderId: "78966322330",
  appId: "1:78966322330:web:d3244e3df502933f0e1b23",
  measurementId: "G-VJDTTEYGNQ"
};

export const app = initializeApp(firebaseConfig);



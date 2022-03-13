import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgetDIpksZ2zqBBWRjasyi3zt2c6eekIA",
  authDomain: "react-authentication-fir-6a8d2.firebaseapp.com",
  projectId: "react-authentication-fir-6a8d2",
  storageBucket: "react-authentication-fir-6a8d2.appspot.com",
  messagingSenderId: "211527715684",
  appId: "1:211527715684:web:58c7038a9d010a522f0871",
  measurementId: "G-Z9VHXBE883",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

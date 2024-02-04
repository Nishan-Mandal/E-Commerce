// Import necessary modules from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZHau5tiEryTX92Vo7g_ZYcEX5oHm_qmk",
  authDomain: "e-commerce-d6aae.firebaseapp.com",
  projectId: "e-commerce-d6aae",
  storageBucket: "e-commerce-d6aae.appspot.com",
  messagingSenderId: "1042706557693",
  appId: "1:1042706557693:web:edddff586056e4cf82ac94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARBy0idY4MxGq8QidVu1kQ7p9N-Avvhk4",
    authDomain: "ntf-clone-df308.firebaseapp.com",
    projectId: "ntf-clone-df308",
    storageBucket: "ntf-clone-df308.firebasestorage.app",
    messagingSenderId: "564986128171",
    appId: "1:564986128171:web:9eff434aedfc8c76ac876e",
    measurementId: "G-5CDEVFHMZV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage= getStorage(app);
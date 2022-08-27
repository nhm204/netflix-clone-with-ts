// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF6_hoh7ImzfL5YNCBmdV-FnQf8-GAU1I",
  authDomain: "netflix-clone-with-ts.firebaseapp.com",
  projectId: "netflix-clone-with-ts",
  storageBucket: "netflix-clone-with-ts.appspot.com",
  messagingSenderId: "1062599634694",
  appId: "1:1062599634694:web:44a5931918b6a80e0fb887"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
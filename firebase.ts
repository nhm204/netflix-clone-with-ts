// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7s2ix8VqtvaWV0QtsTbpitEzQVo3-geI",
    authDomain: "ts-netflix-clone-nextjs.firebaseapp.com",
    projectId: "ts-netflix-clone-nextjs",
    storageBucket: "ts-netflix-clone-nextjs.appspot.com",
    messagingSenderId: "5330037829",
    appId: "1:5330037829:web:efb2e29db5c7f1b0d4472c"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
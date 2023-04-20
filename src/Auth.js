import {initializeApp} from "firebase/app"
import { getFirestore } from "firebase/firestore";
import  {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "kubess-project.firebaseapp.com",
  projectId: "kubess-project",
  storageBucket: "kubess-project.appspot.com",
  messagingSenderId: "534702335037",
  appId: "1:534702335037:web:0e97292270f78764c0f654"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
}
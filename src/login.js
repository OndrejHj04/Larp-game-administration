import {initializeApp} from "firebase/app"
import  {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDSEeLOBAne-x66bsJayB2pszSs6M8vs1Q",
  authDomain: "kubess-project.firebaseapp.com",
  projectId: "kubess-project",
  storageBucket: "kubess-project.appspot.com",
  messagingSenderId: "534702335037",
  appId: "1:534702335037:web:0e97292270f78764c0f654"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
}
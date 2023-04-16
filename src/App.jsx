import { signInWithGoogle } from "./firebase"
import {initializeApp} from "firebase/app"

function App() {

  const googleSingIn = () => {
    signInWithGoogle().then(res=>console.log(res))
  }

  return (
    <div className='w-screen h-screen flex bg-red-300'>
      <div className='text-4xl m-auto border-blue-400 border-4 px-2 py-1 rounded-3xl cursor-pointer' onClick={()=>googleSingIn()}>GOOGLE LOGIN</div>
    </div>
  )
}

export default App

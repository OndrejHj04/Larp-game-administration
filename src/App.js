import { useReducer } from "react";
import { signInWithGoogle } from "./Auth";
import { RouterProvider } from "react-router-dom";
import { initial, reducer } from "./store";
import { router } from "./router/pages";


function App() {
  const [state, dispatch] = useReducer(reducer, initial)

  const handleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div className="w-screen h-screen flex flex-1">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

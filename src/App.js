import { useEffect, useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { initial, reducer } from "./store";
import Login from "./router/Login";
import Administration from "./router/Administration";
import Player from "./router/Player";
import NotFound from "./router/NotFound";

function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === "ADMIN") {
      dispatch({ type: "set-admin" });
    } else if (login === "PLAYER") {
      dispatch({ type: "set-player" });
    }
  }, []);

  useEffect(() => {
    if (state.login) {
      localStorage.setItem("login", state.login);
      if (state.login === "ADMIN") {
        navigate("/admin");
      } else if (state.login === "PLAYER") {
        navigate("/player");
      }
    } else {
      navigate("/");
    }
  }, [state.login, navigate]);

  return (
    <div className="w-screen h-screen flex flex-1">
      <Routes>
        <Route path="/" element={<Login dispatch={dispatch} />} />
        {state.login === "ADMIN" && (
          <Route path="/admin" element={<Administration state={state} dispatch={dispatch}/>} />
        )}
        {state.login === "PLAYER" && (
          <Route path="/player" element={<Player state={state} dispatch={dispatch}/>} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

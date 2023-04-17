import { useState } from "react";
import { signInWithGoogle } from "./login";

function App() {
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleLogin = () => {
    signInWithGoogle().then((res) => {
      if (
        res.user.email === "hajekkubik@gmail.com" ||
        res.user.email === "ondrej.hajek.profi@gmail.com"
      ) {
        setLogin(true);
        setAdmin(true);
      } else {
        handleGuest();
      }
    });
  };

  const handleGuest = () => {
    setLogin(true);
    setAdmin(false);
  };

  return (
    <div className="w-screen h-screen flex flex-1">
      {!login ? (
        <div className="m-auto text-5xl">
          <div>
            <button onClick={handleLogin}>ADMIN</button>
          </div>
          <div className="bg-black w-full h-1 m-1" />
          <div className="text-center" onClick={handleGuest}>
            <button>HRÁČ</button>
          </div>
        </div>
      ) : (
        <>
          {admin ? (
            <>
              <div>
                <h1>prihlasen jako admin</h1>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1>prihlasen jako hrac</h1>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

import { Button, Typography } from "@mui/material";
import { signInWithGoogle } from "../Auth";

export default function Login({ dispatch }) {
  const handleLogin = () => {
    signInWithGoogle().then((res) => {
      if (true) {
        dispatch({ type: "set-admin" });
      } else {
        dispatch({ type: "set-player" });
      }
    });
  };

  return (
    <div className="flex-1 flex">
      <div className="m-auto flex flex-col">
        <div className="mx-auto">
          <Button onClick={handleLogin} variant="contained" size="large">
            <Typography>ADMINISTRATION</Typography>
          </Button>
        </div>
        <div className="bg-white w-full h-3" />
        <div className="mx-auto">
          <Button
            onClick={() => dispatch({ type: "set-player" })}
            variant="contained"
            size="large"
          >
            <Typography>PLAYER</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button, Link, Typography } from "@mui/material";
import { signInWithGoogle } from "../Auth";

export default function Login({ dispatch }) {
  const handleLogin = () => {
    signInWithGoogle().then((res) => {
      if (
        res.user.email === "ondrej.hajek.profi@gmail.com" ||
        res.user.email === "hajekkubik@gmail.com"
      ) {
        dispatch({ type: "set-admin" });
      } else {
        dispatch({ type: "set-player" });
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col">
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
      <div className="p-2 flex shadow-2xl justify-between">
        <div>
          <Typography>
            Designed with 💘 and 🍺 by{" "}
            <Link
              href={process.env.REACT_APP_BEST_DISCORD}
              target="_blank"
              underline="none"
            >
              Houska-dev
            </Link>
          </Typography>
        </div>
        <div>
          <Link
            href={process.env.REACT_APP_ZASRANA_PRACE}
            target="_blank"
            underline="none"
          >
            <Typography className="text-white">MILUJI SVOJI PRÁCI!</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}

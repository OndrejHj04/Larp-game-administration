import { createBrowserRouter } from "react-router-dom";
import Login from "../Login";
import Administration from "../Administration";
import Player from "../Player";
import NotFound from "../NotFound";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <Administration />,
    },
    {
      path: "/player",
      element: <Player />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
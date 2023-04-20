import { Pagination } from "@mui/material";
import { db } from "../../Auth";
import Inventory from "./slides/Inventory";
import Equipment from "./slides/Equipment";
import Crafting from "./slides/Crafting";

export default function Player({ state, dispatch }) {
  const handleSlides = (_, value) => {
    dispatch({ type: "set-slides", value });
  };
  return (
    <div className="flex-1 flex flex-col">
      {state.slides === 1 && (
        <Inventory state={state} dispatch={dispatch} db={db} />
      )}
      {state.slides === 2 && (
        <Equipment state={state} dispatch={dispatch} db={db} />
      )}
      {state.slides === 3 && (
        <Crafting state={state} dispatch={dispatch} db={db} />
      )}
      <div className="mx-auto my-3">
        <Pagination count={3} page={state.slides} onChange={handleSlides} />
      </div>
    </div>
  );
}

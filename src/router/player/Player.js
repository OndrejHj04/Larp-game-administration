import { Pagination } from "@mui/material";
import { db } from "../../Auth";
import Inventory from "./slides/Inventory";
import Equipment from "./slides/Equipment";
import Crafting from "./slides/Crafting";
import Codes from "./slides/Codes";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

export default function Player({ state, dispatch }) {
  const handleSlides = (_, value) => {
    dispatch({ type: "set-slides", value });
  };
  useEffect(() => {
    onSnapshot(collection(db, "inventory"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-inventory", data });
    });

    onSnapshot(collection(db, "equipment"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-equipment", data });
    });

    onSnapshot(collection(db, "oxygen-masks"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-masks", data });
    });

    onSnapshot(collection(db, "codes"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "get-codes", data });
    });
  }, []);

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
      {state.slides === 4 && (
        <Codes state={state} dispatch={dispatch} db={db} />
      )}
      <div className="mx-auto my-3">
        <Pagination count={4} page={state.slides} onChange={handleSlides} />
      </div>
    </div>
  );
}

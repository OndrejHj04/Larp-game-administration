import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Pagination,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import Inventory from "./slides/Inventory";
import Equipment from "./slides/Equipment";
import Crafting from "./slides/Crafting";

export default function Administration({ state, dispatch }) {
  const handleSlides = (_, value) => {
    dispatch({ type: "set-slides", value });
  };
  console.log(state.slider);
  return (
    <div className="flex-1 flex flex-col">
      {state.slides === 1 && <Inventory state={state} dispatch={dispatch} />}
      {state.slides === 2 && <Equipment state={state} dispatch={dispatch} />}
      {state.slides === 3 && <Crafting state={state} dispatch={dispatch} />}
      <div className="mx-auto my-3">
        <Pagination count={3} page={state.slides} onChange={handleSlides} />
      </div>
    </div>
  );
}
import { Pagination } from "@mui/material";
import Inventory from "./slides/Inventory";
import Equipment from "./slides/Equipment";
import Codes from "./slides/Codes";
import CodesDashboard from "./slides/CodesDashboard";

export default function Administration({ state, dispatch }) {
  const handleSlides = (_, value) => {
    dispatch({ type: "set-slides", value });
  };

  return (
    <div className="flex-1 flex flex-col">
      {state.slides === 1 && <Inventory state={state} dispatch={dispatch} />}
      {state.slides === 2 && <Equipment state={state} dispatch={dispatch} />}
      {state.slides === 3 && <Codes state={state} dispatch={dispatch} />}
      {state.slides === 4 && <CodesDashboard state={state} dispatch={dispatch} />}
      <div className="mx-auto my-3">
        <Pagination count={4} page={state.slides} onChange={handleSlides} />
      </div>
    </div>
  );
}

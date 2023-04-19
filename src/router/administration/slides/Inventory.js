import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../Auth";
import { useEffect } from "react";

export default function Inventory({ state, dispatch }) {
  useEffect(() => {
    onSnapshot(collection(db, "inventory"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-inventory", data });
    });
  }, []);

  const handleIncrement = ({ id, name, count }) => {
    updateDoc(doc(db, "inventory", name), {
      count: count + state.slider,
    });
  };

  const handleDecrement = ({ id, name, count }) => {
    if (count > 0) {
      updateDoc(doc(db, "inventory", name), {
        count: count - state.slider,
      });
    }
  };

  const handleResetCount = () => {
    state.inventory.forEach(({ name }) => {
      updateDoc(doc(db, "inventory", name), {
        count: 0,
      });
    });
    dispatch({ type: "set-modal" });
  };

  const handleSlider = (e) => {
    dispatch({ type: "set-slider", value: e.target.value });
  };
  return (
    <>
      <Paper className="m-auto p-4 flex flex-col">
        <Typography variant="h4" className="text-center">
          Inventář lodi
        </Typography>
        {state.loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {state.inventory.map(({ id, name, count }) => (
              <div className="flex items-center mb-1 mt-1" key={id}>
                <div className="mr-auto">
                  <Typography variant="h6">{name}</Typography>
                </div>
                <div className="ml-4">
                  <Typography>POČET: {count}</Typography>
                </div>
                <div className="ml-4">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleIncrement({ id, name, count })}
                  >
                    <Typography>PŘIDAT</Typography>
                  </Button>
                </div>
                <div className="ml-4">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDecrement({ id, name, count })}
                  >
                    <Typography>ODEBRAT</Typography>
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="mt-5">
          <Typography variant="h6" className="text-center">
            Aktuální počet přidání nebo odebrání: {state.slider}
          </Typography>
          <Slider
            aria-label="Small steps"
            onChange={handleSlider}
            defaultValue={1}
            step={1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="mt-3 flex justify-center">
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => dispatch({ type: "set-modal" })}
          >
            <Typography>RESET ALL</Typography>
          </Button>
        </div>
      </Paper>
      <Modal
        open={state.modal}
        onClose={() => dispatch({ type: "set-modal" })}
        className="flex-1 flex"
      >
        <Box className="m-auto bg-white p-3 rounded-2xl">
          <Typography variant="h6" color="red">
            SMAZAT INVENTÁŘ!
          </Typography>
          <Typography>
            Opravdu chcete nastavit u všech předmětů v inventáři počet na 0?
            Tato akce bude nevratná.
          </Typography>
          <div className="mt-3">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleResetCount}
            >
              <Typography>RESTARTOVAT</Typography>
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

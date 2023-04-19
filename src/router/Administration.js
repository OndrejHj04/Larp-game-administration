import {
  Button,
  CircularProgress,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../Auth";
export default function Administration({ state, dispatch }) {
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
    updateDoc(doc(db, "inventory", name), {
      count: count - state.slider,
    });
  };

  const handleSlider = (e) => {
    dispatch({type: "set-slider", value: e.target.value})
  }

  return (
    <div className="flex-1 flex">
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
          <Typography variant="h6" className="text-center">Aktuální počet přidání nebo odebrání: {state.slider}</Typography>
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
      </Paper>
    </div>
  );
}

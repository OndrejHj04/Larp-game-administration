import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export default function Inventory({ state, dispatch, db }) {
  useEffect(() => {
    onSnapshot(collection(db, "inventory"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-inventory", data });
    });
  }, []);

  const handleCrafting = (name) => {
    dispatch({ type: "set-crafting-modal", value: name });
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
                    onClick={() => handleCrafting(name)}
                  >
                    <Typography>Craftit</Typography>
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </Paper>
      <Modal
        onClose={() => dispatch({ type: "set-crafting-modal", value: "" })}
        open={Boolean(state.craftingModal.length)}
        className="flex-1 flex"
      >
        <Box className="m-auto bg-white p-3 rounded-2xl">
          <Typography variant="h6" color="green">
            Craftění!
          </Typography>
          <Typography>Na craftění PŘEDMĚTU potřebujete PŘEDMĚTY!</Typography>
          <div className="mt-3">
            <Button variant="contained" color="success">
              <Typography>CRAFTIT</Typography>
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

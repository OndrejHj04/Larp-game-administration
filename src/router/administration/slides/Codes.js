import { Button, Paper, TextField, Typography } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Auth";

export default function Codes({ state, dispatch }) {
  const handleSubmit = () => {
    if (state.code.length) {
      getDoc(doc(db, "codes", state.code)).then((res) => {
        if (res.data() && res.data().state) {
          const { code } = res.data();

          if (code.includes("XD")) {
            const ref = doc(db, "inventory", "Kov A");
            getDoc(ref).then((res) => {
              const { count } = res.data();

              updateDoc(ref, {
                count: count + 2,
              });

              updateDoc(doc(db, "codes", state.code), { state: 0 });
            });
          }
        }
      });
    }
  };

  return (
    <>
      <Paper className="m-auto p-4 flex flex-col">
        <TextField
          label="Zadejte kód"
          variant="outlined"
          value={state.code}
          onChange={(e) =>
            dispatch({ type: "input-code", value: e.target.value })
          }
        />
        <div className="mt-3 mx-auto">
          <Button onClick={handleSubmit} variant="contained" size="large">
            <Typography>ODESLAT</Typography>
          </Button>
        </div>
      </Paper>
    </>
  );
}

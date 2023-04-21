import { Button, Paper, TextField, Typography } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Auth";
import Swal from "sweetalert2";

export default function Codes({ state, dispatch }) {
  const handleSubmit = () => {
    if (state.code.length) {
      getDoc(doc(db, "codes", state.code)).then((res) => {
        if (res.data() && res.data().state) {
          const { code } = res.data();
          state.codePairs.forEach(({ item, sign }) => {
            if (code.includes(sign)) {
              const ref = doc(db, "inventory", item);
              getDoc(ref)
                .then((res) => {
                  updateDoc(ref, {
                    count: res.data().count + 2,
                  });
                })
                .then(() => {
                  updateDoc(doc(db, "codes", code), {
                    state: 0,
                  });
                  Swal.fire(
                    `Správný kód! Získáváte 2x ${item}.`,
                    "",
                    "success"
                  );
                });
            }
          });
        } else {
          Swal.fire("Tento kód neexistuje nebo už byl použit", "", "error");
        }
      });
    } else {
      Swal.fire("Nebyl zadán žádný kód", "", "error");
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

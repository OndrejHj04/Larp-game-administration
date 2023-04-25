import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Auth";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Codes({ state, dispatch }) {
  useEffect(() => {
    onSnapshot(collection(db, "codes"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "get-codes", data });
    });
  }, []);

  const handleSubmit = () => {
    if (state.code.length) {
      const locked = state.lockedItems.filter(
        (item) => item.code === state.code
      );
      if (locked.length) {
        const { item, code, division } = locked[0];
        updateDoc(doc(db, division, item), {
          code: null,
        });
        Swal.fire(`Správný kód! Odmčen předmět ${item}!`, "", "success");
      } else {
        getDoc(doc(db, "codes", state.code)).then((res) => {
          if (res.data() && res.data().state) {
            const { code } = res.data();
            state.codePairs.forEach(({ item, sign, payload }) => {
              if (code.includes(sign)) {
                item.map((val) => {
                  const ref = doc(db, "inventory", val);
                  getDoc(ref).then((res) => {
                    updateDoc(ref, {
                      count: res.data().count + payload,
                    });
                  });
                });

                updateDoc(doc(db, "codes", code), {
                  state: 0,
                });
                Swal.fire(
                  `Správný kód! Získáváte ${payload}x ${item.map(
                    (item) => item
                  )}.`,
                  "",
                  "success"
                );
              }
            });
          } else {
            Swal.fire("Tento kód neexistuje nebo už byl použit", "", "error");
          }
        });
      }
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
        <div className="mt-3 mx-auto flex flex-col">
          <Button onClick={handleSubmit} variant="contained" size="large">
            <Typography>ODESLAT</Typography>
          </Button>
        </div>
      </Paper>
    </>
  );
}

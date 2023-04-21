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

  const handleResetCount = () => {
    state.codes.map(({ code }) => {
      updateDoc(doc(db, "codes", code), {
        state: 1,
      });
    });
    dispatch({ type: "set-modal" });
    Swal.fire("Všechny kódy jsou nyní použitelné", "", "success");
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
        <div className="mx-auto mt-3">
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
            Opravdu chcete restartovat všechny kódy? Tato akce bude nevratná.
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

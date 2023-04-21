import { Chip, CircularProgress, Paper, Typography } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Auth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CodesDashboard({ state, dispatch }) {
  const [loading, setLoading] = useState(true);
  const [codeState, setCodeState] = useState([0, 0]);

  useEffect(() => {
    onSnapshot(collection(db, "codes"), (item) => {
      let data = [];
      let count = [0, 0];
      item.forEach((doc) => {
        data.push(doc.data());
        doc.data().state === 0 && count[0]++;
        doc.data().state === 1 && count[1]++;
      });
      dispatch({ type: "get-codes", data });
      setCodeState(count);
    });
  }, []);

  useEffect(() => {
    if (state.codes.length) {
      setLoading(false);
    }
  }, [state.codes]);

  return (
    <>
      <Paper className="m-auto p-4 flex flex-col">
        <Typography variant="h4" className="text-center">
          Dashboard
        </Typography>
        <div className="flex justify-center">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="flex-1">
              <Typography className="text-center">
                Počet použítých kódů
              </Typography>
              <div className="flex-1 flex justify-between my-1 ">
                <Chip
                  icon={<CheckCircleIcon style={{ color: "#009A17" }} />}
                  label={<Typography>{codeState[0]}</Typography>}
                />
                <Chip
                  icon={<CancelIcon style={{ color: "#FF0000" }} />}
                  label={<Typography>{codeState[1]}</Typography>}
                />
              </div>
              <Typography className="text-center">
                Počet získaných surovin
              </Typography>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
}

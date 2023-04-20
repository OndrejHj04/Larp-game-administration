import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { CircularProgress, Paper, Typography } from "@mui/material";

export default function Equipment({ state, db, dispatch }) {
  useEffect(() => {
    onSnapshot(collection(db, "equipment"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-equipment", data });
    });

    onSnapshot(collection(db, "oxygen-masks"), (item) => {
      let data = [];
      item.forEach((doc) => data.push(doc.data()));
      dispatch({ type: "set-masks", data });
    });
  }, []);

  return (
    <>
      <Paper className="m-auto p-4 flex flex-col">
        <Typography variant="h4" className="text-center">
          Vybavení
        </Typography>
        {state.loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {state.masks.map(({ id, name, level }) => (
              <div className="flex items-center mb-1 mt-1" key={id}>
                <div className="mr-auto">
                  <Typography variant="h6">{name}</Typography>
                </div>
                <div className="ml-4">
                  <Typography>ÚROVEŇ: {level}</Typography>
                </div>
              </div>
            ))}
            {state.equipment.map(({ id, name, count }) => (
              <div className="flex items-center mb-1 mt-1" key={id}>
                <div className="mr-auto">
                  <Typography variant="h6">{name}</Typography>
                </div>
                <div className="ml-4">
                  <Typography>POČET: {count}</Typography>
                </div>
              </div>
            ))}
          </>
        )}
      </Paper>
    </>
  );
}

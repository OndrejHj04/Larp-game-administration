import { Paper, Typography } from "@mui/material";

export default function Equipment({ state, dispatch }) {
  return (
    <>
      <Paper className="m-auto p-4 flex flex-col">
        <Typography variant="h4" className="text-center">
          Vybavení
        </Typography>
      </Paper>
    </>
  );
}

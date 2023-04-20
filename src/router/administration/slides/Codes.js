import { Button, Paper, TextField, Typography } from "@mui/material";

export default function Codes({ state }) {
  return (
    <>
      <Paper className="m-auto p-4 flex flex-col">
        <TextField label="Zadejte kód" variant="outlined" />
        <div className="mt-3 mx-auto">
          <Button variant="contained" size="large">
            <Typography>ODESLAT</Typography>
          </Button>
        </div>
      </Paper>
    </>
  );
}

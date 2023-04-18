import { Button, Paper, Typography } from "@mui/material";

export default function Administration({ state }) {
  return (
    <div className="flex-1 flex">
      <Paper className="m-auto p-4 flex flex-col">
        <Typography variant="h4" className="text-center">
          Inventář lodi
        </Typography>
        {state.inventory.map(({ id, name, count }) => (
          <div className="flex items-center mb-1 mt-1" key={id}>
            <div className="mr-auto">
              <Typography variant="h6">{name}</Typography>
            </div>
            <div className="ml-4">
              <Typography>POČET: {count}</Typography>
            </div>
            <div className="ml-4">
              <Button variant="contained" size="small">
                <Typography>PŘIDAT</Typography>
              </Button>
            </div>
            <div className="ml-4">
              <Button variant="contained" size="small">
                <Typography>ODEBRAT</Typography>
              </Button>
            </div>
          </div>
        ))}
      </Paper>
    </div>
  );
}

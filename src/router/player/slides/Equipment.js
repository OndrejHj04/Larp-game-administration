import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import HttpsIcon from "@mui/icons-material/Https";

export default function Equipment({ state, db, dispatch }) {
  const handleCrafting = (name) => {
    dispatch({ type: "set-crafting-modal", value: name });
  };

  const craftMask = ({ name, level }) => {
    if (level < 4) {
      const valid = Object.keys(state.maskUpgrade[level - 1]).every((item) => {
        return (
          state.inventory.find((val) => val.name === item).count >
          state.maskUpgrade[level - 1][item]
        );
      });
      if (valid) {
        Object.keys(state.maskUpgrade[level - 1]).map((item) => {
          getDoc(doc(db, "inventory", item)).then((res) => {
            updateDoc(doc(db, "inventory", item), {
              count: res.data().count - state.maskUpgrade[level - 1][item],
            });
          });
        });

        updateDoc(doc(db, "oxygen-masks", name), {
          level: level + 1,
        });

        Swal.fire(
          "Maska je na nové úrovni",
          `Aktuální úroveň je ${level + 1}`,
          "success"
        );
      } else {
        Object.keys(state.maskUpgrade[level - 1]).map((item) => {
          console.log(state.maskUpgrade[level - 1][item]);
        });
        Swal.fire(
          "Masku nelze upgradovat.",
          `Na další upgrade je potřeba ${Object.keys(
            state.maskUpgrade[level - 1]
          ).map((item) => `${item} x ${state.maskUpgrade[level - 1][item]}`)}`,
          "error"
        );
      }
    } else {
      Swal.fire("Masku nelze upgradovat");
    }
  };

  const makeCrafting = () => {
    const { craftingItem, crafting } = state;

    if (crafting[craftingItem]) {
      const validate = crafting[craftingItem].ingredients.every(
        (ingredience) =>
          state.inventory.find((item) => item.name === ingredience.name)
            .count >= ingredience.count
      );

      if (validate) {
        updateDoc(doc(db, crafting[craftingItem].division, craftingItem), {
          count:
            state[crafting[craftingItem].division].find(
              (item) => item.name === craftingItem
            ).count + crafting[craftingItem].payload,
        }).then(() => {
          crafting[craftingItem].ingredients.forEach((item) => {
            updateDoc(doc(db, "inventory", item.name), {
              count:
                state.inventory.find((inv) => inv.name === item.name).count -
                item.count,
            });
          });
          Swal.fire("Podařilo se vycraftit!", "", "success");
          dispatch({ type: "set-crafting-modal", value: "" });
        });
      } else {
        dispatch({ type: "set-crafting-modal", value: "" });
        Swal.fire("Na vycraftění nemáte dost předmětů!", "", "error");
      }
    }
  };

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
                <div className="ml-4">
                  <Button
                    variant="contained"
                    onClick={() => craftMask({ name, level })}
                    disable
                  >
                    <Typography>Craftit</Typography>
                  </Button>
                </div>
              </div>
            ))}
            {state.equipment.map(({ id, name, count, code }) => (
              <div className="flex items-center mb-1 mt-1" key={id}>
                <div className="mr-auto">
                  <Typography variant="h6">{name}</Typography>
                </div>
                <div className="ml-4">
                  <Typography>POČET: {count}</Typography>
                </div>

                <div className={`${code === null ? "ml-4" : "ml-14"}`}>
                  <Button
                    variant="contained"
                    onClick={() => handleCrafting(name)}
                    disabled={code !== null}
                  >
                    {code === null ? (
                      <Typography>CRAFTIT</Typography>
                    ) : (
                      <HttpsIcon />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </Paper>
      {state.craftingItem && (
        <Modal
          onClose={() => dispatch({ type: "set-crafting-modal", value: "" })}
          open={Boolean(state.craftingItem.length)}
          className="flex-1 flex"
        >
          <Box className="m-auto bg-white p-3 rounded-2xl">
            <Typography variant="h6" color="green">
              Craftění!
            </Typography>
            <div>
              <Typography>
                Na craftění {state.craftingItem} potřebujete
              </Typography>
              {state.crafting[state.craftingItem].ingredients.map((item) => (
                <Typography key={item.name}>
                  {item.count}x {item.name}
                </Typography>
              ))}
            </div>
            <div className="mt-3">
              <Button
                variant="contained"
                color="success"
                onClick={makeCrafting}
                disabled={
                  !state.crafting[state.craftingItem].ingredients.every(
                    (item) =>
                      item.count <
                      state.inventory.find((inv) => inv.name === item.name)
                        .count
                  )
                }
              >
                <Typography>CRAFTIT</Typography>
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}

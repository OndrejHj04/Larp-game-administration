export const initial = {
  login: false,
  loading: true,
  inventory: [],
  equipment: [],
  masks: [],
  slider: 1,
  modal: false,
  slides: 2,
  code: "",
  codePairs: [
    { sign: "XD", item: ["Kov_A"], payload: 4 },
    { sign: "OH", item: ["Kov_B"], payload: 4 },
    { sign: "PP", item: ["Kov_A", "Kov_B"], payload: 2 },
  ],
  codes: [],
  crafting: {
    Vysílačky: {
      payload: 2,
      ingredients: [
        { name: "Kov_A", count: 1 },
        { name: "Kov_B", count: 1 },
      ],
      division: "equipment",
    },
  },
  craftingItem: "",
};

export const reducer = (state, actions) => {
  switch (actions.type) {
    case "set-admin":
      return { ...state, login: "ADMIN" };
    case "set-player":
      return { ...state, login: "PLAYER" };
    case "set-inventory":
      return { ...state, inventory: actions.data, loading: false };
    case "set-slider":
      return { ...state, slider: actions.value };
    case "set-modal":
      return { ...state, modal: !state.modal };
    case "set-slides":
      return { ...state, slides: actions.value };
    case "set-equipment":
      return { ...state, equipment: actions.data, loading: false };
    case "set-masks":
      return { ...state, masks: actions.data, loading: false };
    case "input-code":
      return { ...state, code: actions.value };
    case "get-codes":
      return { ...state, codes: actions.data };
    case "set-crafting-modal":
      return { ...state, craftingItem: actions.value };
    default:
      return { ...state };
  }
};

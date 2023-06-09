export const initial = {
  login: false,
  loading: true,
  inventory: [],
  equipment: [],
  masks: [],
  slider: 1,
  modal: false,
  slides: 1,
  code: "",
  maskUpgrade: [{Kov_A: 2, Kov_B: 2},{Kov_A: 3, Kov_B: 5},{Kov_A: 9, Kov_B: 10}],
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
        { name: "Kov_A", count: 20 },
        { name: "Kov_B", count: 10 },
      ],
      division: "equipment",
    },
    Náboje: {
      payload: 10,
      ingredients: [
        { name: "Kov_A", count: 5 },
        { name: "Kov_B", count: 7 },
      ],
      division: "equipment",
    },
    Dýmovnice: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 20 },
        { name: "Kov_B", count: 10 },
        { name: "Kyselina", count: 1 },
      ],
      division: "equipment",
    },
    Baterky: {
      payload: 2,
      ingredients: [
        { name: "Kov_A", count: 7 },
        { name: "Kyselina", count: 1 },
      ],
      division: "inventory",
    },
    Cívka: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 10 },
        { name: "Kov_B", count: 10 },
      ],
      division: "inventory",
    },
    Kabel: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 15 },
        { name: "Kov_B", count: 10 },
      ],
      division: "inventory",
    },
    Chladič: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 10 },
        { name: "Kov_B", count: 17 },
      ],
      division: "inventory",
    },
    Generátor_energie: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 25 },
        { name: "Kov_B", count: 7 },
      ],
      division: "inventory",
    },
    Žárovka: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 3 },
        { name: "Kov_B", count: 20 },
      ],
      division: "inventory",
    },
    Zbraně: {
      payload: 1,
      ingredients: [
        { name: "Kov_A", count: 2 },
        { name: "Kov_B", count: 28 },
      ],
      division: "equipment",
    },
  },
  craftingItem: "",
  lockedItems: [
    { item: "Chladič", code: "PUIVWILMVA KK", division: "inventory" },
    { item: "Generátor_energie", code: "XVIUTYBVPQ KK", division: "inventory" },
    { item: "Zbraně", code: "MLIKQIUEYB KK", division: "equipment" },
    { item: "Baterky", code: "JJLMTEWAYX KK", division: "inventory" },
    { item: "Dýmovnice", code: "QRWTVYHJKM KK", division: "equipment" },
  ],
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

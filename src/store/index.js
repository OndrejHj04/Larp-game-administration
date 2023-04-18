export const initial = {
  login: false,
  inventory: [
    { id: 1, count: 0, name: "Kov A" },
    { id: 2, count: 0, name: "Kov B" },
    { id: 3, count: 0, name: "Baterka" },
    { id: 4, count: 0, name: "Cívka" },
    { id: 5, count: 0, name: "Kabel" },
    { id: 6, count: 0, name: "Chladič" },
    { id: 7, count: 0, name: "Generátor energie" },
    { id: 8, count: 0, name: "Žárovka" },
    { id: 9, count: 0, name: "CPU" },
  ],
};

export const reducer = (state, actions) => {
  switch (actions.type) {
    case "set-admin":
      return { ...state, login: "ADMIN" };
    case "set-player":
      return { ...state, login: "PLAYER" };
    default:
      return { ...state };
  }
};

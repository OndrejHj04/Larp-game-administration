export const initial = {
  login: false,
  loading: true,
  inventory: [],
  slider: 1,
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
    default:
      return { ...state };
  }
};

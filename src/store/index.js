export const initial = {
  login: false,
  loading: true,
  inventory: [],
  slider: 1,
  modal: false,
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
    default:
      return { ...state };
  }
};

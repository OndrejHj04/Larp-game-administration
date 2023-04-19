export const initial = {
  login: false,
  loading: true,
  inventory: [],
  equipment: [],
  slider: 1,
  modal: false,
  slides: 1
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
      return {...state, slides: actions.value, loading: true}
    case "set-equipment":
      return {...state, equipment: actions.data, loading: false}
    default:
      return { ...state };
  }
};

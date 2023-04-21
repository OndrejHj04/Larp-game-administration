export const initial = {
  login: false,
  loading: true,
  inventory: [],
  equipment: [],
  masks: [],
  slider: 1,
  modal: false,
  slides: 4,
  code: "",
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
      return { ...state, slides: actions.value, loading: true };
    case "set-equipment":
      return { ...state, equipment: actions.data, loading: false };
    case "set-masks":
      return { ...state, masks: actions.data, loading: false };
    case "input-code":
      return { ...state, code: actions.value};
    default:
      return { ...state };
  }
};

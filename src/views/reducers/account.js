import common from "../utils/common";

const modes = [{ enter: "sign_in" }, { create: "sign_up" }];
const initialAppState = {
  mode: "enter",
  context: "sign_in",
  prev: "sign_up",
  prevHover: "sign_up_hover"
};

const account = (state = initialAppState, action) => {
  if (action.type === "TOGGLE_MODE") {
    const prev = state.context;
    const next = common.rotate(state.mode, modes);
    const [mode, context] = Object.entries(next)[0];
    return {
      ...state,
      mode: mode,
      context: context,
      prev: prev,
      prevHover: prev + "_hover"
    };
  } else if (action.type === "INPUT_USERNAME") {
    return {
      ...state,
      username: action.username
    };
  } else {
    return {
      ...state,
      password: action.password
    };
  }
};

export default account;

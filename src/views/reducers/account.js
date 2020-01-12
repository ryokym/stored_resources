import common from "../utils/common";

const modes = new Map([
  ["enter", "sign_in"],
  ["create", "sign_up"]
]);

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
  } else if (action.type === "INPUT_PASSWORD") {
    return {
      ...state,
      password: action.password
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      mode: "create"
    };
  } else if (action.type === "REQUEST_POST") {
    const mode = state.mode === "create" ? "verify" : state.mode;
    const bucketkey = common.createKey();
    return {
      ...state,
      mode: mode,
      bucketkey: bucketkey
    };
  } else if (action.type === "RECEIVE_POST") {
    if (action.response === "enter") {
      location.href = "/";
    } else {
      alert(action.response);
    }
    return {
      ...state
    };
  } else {
    return {
      ...state
    };
  }
};

export default account;

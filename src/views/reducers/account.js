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
    const [mode, context] = next;
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
  } else if (action.type === "INPUT_BUCKET") {
    return {
      ...state,
      bucket: action.bucket
    };
  } else if (action.type === "INPUT_BUCKETVAL") {
    return {
      ...state,
      bucketval: action.bucketval
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      mode: "create"
    };
  } else if (action.type === "REQUEST_POST") {
    return {
      ...state
    };
  } else if (action.type === "RECEIVE_POST") {
    if (state.mode === "create") {
      const mode = "verify";
      return {
        ...state,
        mode: mode,
        bucketkey: common.createKey()
      };
    }

    if (action.response === "verify") {
      alert("account creation suceeded!");
    }

    if (action.response === state.mode) {
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

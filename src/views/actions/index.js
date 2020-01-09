export const toggleMode = mode => ({
  type: "TOGGLE_MODE",
  mode
});

export const inputUserName = username => ({
  type: "INPUT_USERNAME",
  username
});

export const inputPassword = password => ({
  type: "INPUT_PASSWORD",
  password
});

export const requestPost = () => ({
  type: "REQUEST_POST"
});

export const receivePost = response => ({
  type: "RECEIVE_POST",
  response
});

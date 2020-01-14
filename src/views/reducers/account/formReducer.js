const formReducer = (state, action) => {
  if (action.type === "INPUT_USERNAME") {
    return {
      ...state,
      username: action.payload.username
    };
  } else if (action.type === "INPUT_PASSWORD") {
    return {
      ...state,
      password: action.payload.password
    };
  } else if (action.type === "INPUT_BUCKET") {
    return {
      ...state,
      bucket: action.payload.bucket
    };
  } else if (action.type === "INPUT_BUCKETVAL") {
    return {
      ...state,
      bucketval: action.payload.bucketval
    };
  } else {
    return {
      ...state
    };
  }
};

export default formReducer;
import ActionTypes from "~/utils/actionTypes";

const formReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INPUT_DIRECTORY_NAME:
      return {
        ...state,
        dirname: action.payload.dirname
      };
    case ActionTypes.BREAK_MKDIR_FORM:
      return {
        ...state,
        dirname: action.payload.dirname
      };
    case ActionTypes.CONTINUOUS_INPUT_MKDIR_FORM:
      return {
        ...state,
        dirname: action.payload.dirname
      };
    case ActionTypes.INPUT_USERNAME:
      return {
        ...state,
        username: action.payload.username
      };
    case ActionTypes.INPUT_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      };
    case ActionTypes.INPUT_BUCKET:
      return {
        ...state,
        bucket: action.payload.bucket
      };
    case ActionTypes.INPUT_BUCKETVAL:
      return {
        ...state,
        bucketval: action.payload.bucketval
      };
    case ActionTypes.REQUIRE_VERIFY_FORM:
      return {
        ...state,
        bucketkey: action.payload.bucketkey
      };
    case ActionTypes.BREAK_VERIFY_FORM:
      return {
        ...state,
        bucket: "",
        bucketkey: "",
        bucketval: ""
      };
    default:
      return { ...state };
  }
};

export default formReducer;

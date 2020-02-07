import ActionTypes from "~/utils/actionTypes";

export const clickSigninOrUp = ({ ...props }) => ({
  type: ActionTypes.CLICK_SIGNIN_OR_UP,
  payload: props
});

export const inputUserName = ({ ...props }) => ({
  type: ActionTypes.INPUT_USERNAME,
  payload: props
});

export const inputPassword = ({ ...props }) => ({
  type: ActionTypes.INPUT_PASSWORD,
  payload: props
});

export const inputBucket = ({ ...props }) => ({
  type: ActionTypes.INPUT_BUCKET,
  payload: props
});

export const inputBucketVal = ({ ...props }) => ({
  type: ActionTypes.INPUT_BUCKETVAL,
  payload: props
});

export const requireVerifyForm = ({ ...props }) => ({
  type: ActionTypes.REQUIRE_VERIFY_FORM,
  payload: props
});

export const breakVerifyForm = ({ props }) => ({
  type: BREAK_VERIFY_FORM,
  payload: props
});

export const requireSigninOrUpForm = ({ ...props }) => ({
  type: ActionTypes.REQUIRE_SIGNIN_OR_UP_FORM,
  payload: props
});

export const requestPost = () => ({
  type: ActionTypes.REQUEST_POST
});

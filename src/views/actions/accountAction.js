import ActionTypes from "~/utils/actionTypes";

export const clickSigninOrUp = behavior => ({
  type: ActionTypes.CLICK_SIGNIN_OR_UP,
  payload: { behavior: behavior }
});

export const inputUserName = username => ({
  type: ActionTypes.INPUT_USERNAME,
  payload: { username }
});

export const inputPassword = password => ({
  type: ActionTypes.INPUT_PASSWORD,
  payload: { password }
});

export const inputBucket = bucket => ({
  type: ActionTypes.INPUT_BUCKET,
  payload: { bucket }
});

export const inputBucketVal = bucketval => ({
  type: ActionTypes.INPUT_BUCKETVAL,
  payload: { bucketval }
});

export const requireVerifyForm = (behavior, bucketkey) => ({
  type: ActionTypes.REQUIRE_VERIFY_FORM,
  payload: {
    behavior: behavior,
    bucketkey: bucketkey
  }
});

export const requireSigninOrUpForm = () => ({
  type: ActionTypes.REQUIRE_SIGNIN_OR_UP_FORM,
  payload: { behavior: "create" }
});

export const requestPost = () => ({
  type: ActionTypes.REQUEST_POST
});

export const clickSigninOrUp = behavior => ({
  type: "CLICK_SIGNIN_OR_UP",
  payload: { behavior: behavior }
});

export const inputUserName = username => ({
  type: "INPUT_USERNAME",
  payload: { username }
});

export const inputPassword = password => ({
  type: "INPUT_PASSWORD",
  payload: { password }
});

export const inputBucket = bucket => ({
  type: "INPUT_BUCKET",
  payload: { bucket }
});

export const inputBucketVal = bucketval => ({
  type: "INPUT_BUCKETVAL",
  payload: { bucketval }
});

export const requireVerifyForm = (behavior, bucketkey) => ({
  type: "REQUIRE_VERIFY_FORM",
  payload: {
    behavior: behavior,
    bucketkey: bucketkey
  }
});

export const requireSigninOrUpForm = () => ({
  type: "REQUIRE_SIGNIN_OR_UP_FORM",
  payload: { behavior: "create" }
});

export const requestPost = () => ({
  type: "REQUEST_POST"
});

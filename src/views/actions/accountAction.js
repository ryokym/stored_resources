import common from "../utils/common";

export const clickSigninOrUp = (behavior, context) => {
  const behaviors = new Map([
    ["enter", "sign_in"],
    ["create", "sign_up"]
  ]);
  const next = common.rotate(behavior, behaviors);
  const [nextBehavior, nextContext] = next;
  return {
    type: "CLICK_SIGNIN_OR_UP",
    payload: {
      behavior: nextBehavior,
      context: nextContext,
      prev: context,
      prevHover: context + "_hover"
    }
  };
};

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

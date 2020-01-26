import common from "../utils/common";

export const clickSigninOrUp = (mode, context) => {
  const modes = new Map([
    ["enter", "sign_in"],
    ["create", "sign_up"]
  ]);
  const next = common.rotate(mode, modes);
  const [nextMode, nextContext] = next;
  return {
    type: "CLICK_SIGNIN_OR_UP",
    payload: {
      mode: nextMode,
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

export const clickOpenModalVerify = () => ({
  type: "CLICK_OPEN_MODAL_VERIFY",
  payload: {
    modalIsOpen: true
  }
});

export const requireVerifyForm = (mode, bucketkey) => ({
  type: "REQUIRE_VERIFY_FORM",
  payload: {
    mode: mode,
    bucketkey: bucketkey
  }
});

export const clickCloseModal = () => ({
  type: "CLICK_CLOSE_MODAL",
  payload: { modalIsOpen: false }
});

export const requireSigninOrUpForm = () => ({
  type: "REQUIRE_SIGNIN_OR_UP_FORM",
  payload: { mode: "create" }
});

export const requestPost = () => ({
  type: "REQUEST_POST"
});

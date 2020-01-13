export const selectMode = state => state.account.mode;
export const selectFormdataForSignInOrUp = state => ({
  actionType: state.account.mode,
  username: state.account.username,
  password: state.account.password
});

const formdataForCreateAccount = state => ({
  bucket: state.account.bucket,
  bucketkey: state.account.bucketkey,
  bucketval: state.account.bucketval
});

export const selectFormdataForCreateAccount = state => {
  return Object.assign(
    selectFormdataForSignInOrUp(state),
    formdataForCreateAccount(state)
  );
};

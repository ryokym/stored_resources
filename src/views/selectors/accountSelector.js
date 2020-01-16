export const selectMode = state => state.modeReducer.mode;
export const selectFormdataForSignInOrUp = state => ({
  actionType: state.modeReducer.mode,
  username: state.formReducer.username,
  password: state.formReducer.password
});

const formdataForCreateAccount = state => ({
  bucket: state.formReducer.bucket,
  bucketkey: state.modeReducer.bucketkey,
  bucketval: state.formReducer.bucketval
});

export const selectFormdataForCreateAccount = state => {
  return Object.assign(
    selectFormdataForSignInOrUp(state),
    formdataForCreateAccount(state)
  );
};

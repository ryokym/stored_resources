export const selectBehavior = state => state.behaviorReducer.behavior;
export const selectFormdataForSignInOrUp = state => ({
  actionType: state.behaviorReducer.behavior,
  username: state.formReducer.username,
  password: state.formReducer.password
});

const formdataForCreateAccount = state => ({
  bucket: state.formReducer.bucket,
  bucketkey: state.formReducer.bucketkey,
  bucketval: state.formReducer.bucketval
});

export const selectFormdataForCreateAccount = state => {
  return Object.assign(
    selectFormdataForSignInOrUp(state),
    formdataForCreateAccount(state)
  );
};

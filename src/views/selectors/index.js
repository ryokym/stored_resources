export const selectMode = state => state.account.mode;
export const selectFormdataForEnter = state => ({
  actionType: "enter",
  username: state.account.username,
  password: state.account.password
});
export const selectFormdataForVerify = state => ({
  actionType: "verify",
  username: state.account.username,
  password: state.account.password,
  bucket: state.account.bucket,
  bucketkey: state.account.bucketkey,
  bucketval: state.account.bucketval
});

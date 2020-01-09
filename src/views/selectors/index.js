export const selectMode = state => state.account.mode;
export const selectFormdataForEnter = state => ({
  actionType: "enter",
  username: state.account.username,
  password: state.account.password
});

export let globalState = {
  token: null
};

export const setToken = (token) => {
  globalState.token = token;
};

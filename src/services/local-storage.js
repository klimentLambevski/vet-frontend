export const localStorageService = {
  getItem(key) {
    return localStorage.getItem(key);
  },
  setItem(key, item) {
    return localStorage.setItem(key, item);
  },
  clearItem(key) {
    return localStorage.removeItem(key);
  }
};
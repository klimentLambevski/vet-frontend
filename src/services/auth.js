import {get, post} from "./gateway";
import {localStorageService} from "./local-storage";
import {setToken} from "../store/global";
import {EventBus} from "./event-bus";

export const signIn = ({email, password}) =>
  post('/auth/login', {
    email: email,
    password: password
  }).then(res => {
    localStorageService.setItem('AUTH_TOKEN', res.token);
    setToken(res.token);
    EventBus.$emit('Authorized');
    return res;
  });

export const checkAuthenticated = () =>
  get('/auth/isAuthenticated').then(res => {
    if (res.user) {
      EventBus.$emit('Authorized');
      return res.user;
    } else {
      return Promise.reject(res);
    }
  });

export const logout = () =>
  get('/auth/logout').then(res => {
    localStorageService.clearItem('AUTH_TOKEN');
    setToken(null);
    return res;
  });

export const initToken = () => {
  setToken(localStorageService.getItem('AUTH_TOKEN'));
};
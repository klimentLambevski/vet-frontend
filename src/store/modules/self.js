import {checkAuthenticated, logout} from "../../services/auth";
import {globalState} from "../global";

export default {
  actions: {
    checkAuth({commit}) {
      return checkAuthenticated(globalState.token).then(user => {
        commit('setSelf', user);
        return user;
      })
    },
    signOut({commit}) {
      return logout().then(res => {
        commit('setSelf', null);
      })
    }
  },
  mutations: {
    setSelf(state, user) {
      state.user = user;
    }
  },
  state: {
    user: null
  }
}
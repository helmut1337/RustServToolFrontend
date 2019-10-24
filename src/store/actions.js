import * as api from '../api'
import initialDataState from './initialDataState'

export const login = ({ commit }, payload) => {
  //let login = {name: 'admin', password: 'test'};
  console.log("PAYLOAD", payload);
  commit('receiveLogin', {
    loading: true,
    waiting: true,
    loggedIn: false,
    error: false,
    loginFail: false,
    networkError: false
  });
  api.login(data => {
    commit('receiveLogin', data)
  }, payload)
};

export const logout = ({ commit }) => {
  commit('receiveLogin', {
    loading: true,
    //loggedIn: false
  });
  api.logout(data => {
    commit('receiveLogin', data)
  })
};

export const auth = ({ commit }) => {
  commit('receiveLogin', {
    loading: true,
    //loggedIn: false
  });
  api.auth(data => {
    commit('receiveLogin', data)
  })
};

export const serverCMD = ({ commit }, cmd) => {
  commit('receiveServerCMD', {
    ...initialDataState,
    loading: true,
  });
  api.serverCMD(data => {
    commit('receiveServerCMD', data)
  }, cmd)
};
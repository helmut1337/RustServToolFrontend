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

export const serverCMD_Start = ({ commit }) => {
  commit('receiveServerCMD', {
    ...initialDataState,
    loading: true,
    type: 'start'
  });
  api.serverCMD_Start(data => {
    commit('receiveServerCMD', data)
  })
};

export const serverCMD_Stop = ({ commit }) => {
  commit('receiveServerCMD', {
    loading: true,
    type: 'stop'
  });
  api.serverCMD_Stop(data => {
    commit('receiveServerCMD', data)
  })
};

export const serverCMD_Restart = ({ commit }) => {
  commit('receiveServerCMD', {
    loading: true,
    type: 'restart'
  });
  api.serverCMD_Restart(data => {
    commit('receiveServerCMD', data)
  })
};

export const serverCMD_Kill = ({ commit }) => {
  commit('receiveServerCMD', {
    loading: true,
    type: 'kill'
  });
  api.serverCMD_Kill(data => {
    commit('receiveServerCMD', data)
  })
};
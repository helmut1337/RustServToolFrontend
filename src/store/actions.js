import * as api from '../api'



export const loadCalculatorWerkstuecke = ({ commit }) => {
  commit('receiveCalculatorWerkstuecke', {
    loading: true,
    error: false,
    data: []
  });
  api.fetchCalculatorWerkstuecke(data => {
    commit('receiveCalculatorWerkstuecke', data)
  })
};

export const loadCalculatorBasicData = ({ commit }) => {
  commit('receiveCalculatorBasicData', {
    loading: true,
    error: false,
    data: {}
  });
  //commit('receiveCalculatorBasicData', {});
  api.fetchCalculatorBasicData(data => {
    commit('receiveCalculatorBasicData', data)
  })
};

export const requestWerkstueckPrice = ({ commit }, payload) => {
  console.log("PAYLOAD", payload);
  commit('receiveWerkstueckPrice', {
    loading: true,
    error: false,
    data: {}
  });
  api.fetchWerkstueckPreis(data => {
    commit('receiveWerkstueckPrice', data)
  }, payload)
};

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

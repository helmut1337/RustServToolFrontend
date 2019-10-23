import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import initialDataState from './initialDataState'


Vue.use(Vuex);

const state = {
  currentLogin: {
    ...initialDataState,
    waiting: true,
    loggedIn: false,
    loginFail: false
  },
  currentServerCMD: {
    ...initialDataState,
    type: ""
  },
};


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

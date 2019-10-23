import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const initialDataState = {
  loading: false,
  networkError: false,
  error: false,
};


const state = {
  calculatorWerkstuecke: {
    ...initialDataState,
    data: []
  },
  calculatorBasicData: {
    ...initialDataState,
    data: {}
  },
  calculatorWerkstueckPrice: {
    ...initialDataState,
    data: {}
  },
  currentLogin: {
    ...initialDataState,
    waiting: true,
    loggedIn: false,
    loginFail: false
  },
};


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

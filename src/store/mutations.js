import Vue from 'vue'

export default {

  receiveCalculatorWerkstuecke(state, calculatorWerkstuecke) {
    state.calculatorWerkstuecke = {
      ...state.calculatorWerkstuecke,
      ...calculatorWerkstuecke,
    };
  },

  receiveCalculatorBasicData(state, calculatorBasicData) {
    state.calculatorBasicData  = {
      ...state.calculatorBasicData,
      ...calculatorBasicData,
    };
  },

  receiveWerkstueckPrice(state, calculatorWerkstueckPrice) {
    state.calculatorWerkstueckPrice  = {
      ...state.calculatorWerkstueckPrice,
      ...calculatorWerkstueckPrice,
    };
  },

  receiveLogin(state, login) {
    console.log("mutation", login);
    state.currentLogin  = {
      ...state.currentLogin,
      ...login,
    };
  },



}

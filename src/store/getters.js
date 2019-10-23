

export const currentCalculatorWerkstuecke = state => {
  return state.calculatorWerkstuecke;

};

export const currentCalculatorBasicData = state => {
  return state.calculatorBasicData;
  /*return state.calculatorBasicData
      ? state.calculatorBasicData
      : {}*/
};

export const requestedWerkstueckPrice = state => {
  return state.calculatorWerkstueckPrice;
  /*return state.calculatorBasicData
      ? state.calculatorBasicData
      : {}*/
};

export const requestedLogin = state => {
  return state.currentLogin;
  /*return state.calculatorBasicData
      ? state.calculatorBasicData
      : {}*/
};


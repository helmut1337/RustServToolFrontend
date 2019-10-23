import Vue from 'vue'

export default {

  receiveLogin(state, login) {
    console.log("receiveLogin mutation", login);
    state.currentLogin  = {
      ...state.currentLogin,
      ...login,
    };
  },

  receiveServerCMD(state, data) {
    console.log("receiveServerCMD mutation", data);
    state.currentServerCMD  = {
      ...state.currentServerCMD,
      ...data,
    };
  },


}

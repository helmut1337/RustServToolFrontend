import axios from 'axios'
import store from '../store/index'
import networkConfig from '../networkConfig'
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;

axios.interceptors.response.use(function (response) {
    // Check for valid json response
    if (typeof response.data === 'object') {
        return response;
    }
    return Promise.reject();
}, function (error) {
    //store.commit('increment'); //  <----- todo check 401 here
    return Promise.reject(error);
});

export function fetchCalculatorBasicData(cb) {

    setTimeout(() => {
        axios.get(networkConfig.apiUrl + "calculator/basicData")
            .then((response)  =>  {
                return cb({
                    loading: false,
                    data: response.data
                });
            }, (error)  =>  {
                cb({
                    loading: false,
                    error: true,
                });
                return false;
            }, );
    }, 2000)
}

export function fetchCalculatorWerkstuecke(cb) {
  setTimeout(() => {
    axios.get(networkConfig.apiUrl +"calculator/load")
        .then((response)  =>  {
          return cb({
              loading: false,
              data: response.data
          });
        }, (error)  =>  {
            cb({
                loading: false,
                error: true,
            });
            return false;
        });
  }, 2000)
}

export function login(cb, login) {
    axios.post(networkConfig.apiUrl +"login", login)
        .then((response)  =>  {
            console.log("login success");
            return cb({
                loading: false,
                waiting: false,
                loggedIn: true
            });
        }, (error)  => {
            console.log("login failed", error);
            let loginFail = false;
            let isError = false;
            let networkError = false;
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 401) {
                    loginFail = true;
                } else {
                    isError = true;
                }
            } else {
                networkError = true;
            }

            cb({
                loading: false,
                waiting: false,
                loggedIn: false,
                error: isError,
                loginFail: loginFail,
                networkError: true,
            });
            return false;
        });
}

export function auth(cb) {
    axios.get(networkConfig.apiUrl +"auth", )
        .then((response)  =>  {
            console.log("auth success");
            return cb({
                waiting: false,
                loading: false,
                loggedIn: true
            });
        }, (error)  =>  {
            console.log("auth failed");
            cb({
                waiting: false,
                loading: false,
                loggedIn: false
            });
            return false;
        });
}

export function logout(cb) {
    axios.get(networkConfig.apiUrl +"logout", )
        .then((response)  =>  {
            console.log("logout success");
            return cb({
                waiting: false,
                loading: false,
                loggedIn: false
            });
        }, (error)  =>  {
            console.log("logout failed");
            cb({
                waiting: false,
                loading: false,
            });
            return false;
        });
}

export function controlServer(cb, cmd) {
    axios.post(networkConfig.apiUrl +"controlServer", cmd)
        .then((response)  =>  {
            console.log("controlServer success");
            return cb({
                loading: false,
                waiting: false,
                loggedIn: true
            });
        }, (error)  => {
            console.log("controlServer failed", error);
            let loginFail = false;
            let isError = false;
            let networkError = false;
            if (typeof error.response !== 'undefined') {
                if (error.response.status === 401) {
                    loginFail = true;
                } else {
                    isError = true;
                }
            } else {
                networkError = true;
            }

            cb({
                loading: false,
                waiting: false,
                loggedIn: false,
                error: isError,
                loginFail: loginFail,
                networkError: true,
            });
            return false;
        });
}

import axios from 'axios'

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
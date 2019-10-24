import axios from 'axios'
import initialDataState from '../store/initialDataState'
import store from '../store/index'

import networkConfig from '../config'
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;

axios.interceptors.response.use(function (response) {
    // Check for valid json response
    if (typeof response.data === 'object') {
        return response;
    }
    return Promise.reject();
}, function (error) {
    let errorValues = {
        networkError: false,
        error: false
    };

    if (typeof error.response !== 'undefined') {
        if (error.response.status === 401) {
            store.commit('receiveLogin', {loggedIn: false}); // logout, show login screen
        } else {
            errorValues.error = true;
        }
    } else {
        errorValues.networkError = true;
    }

    const errRes = {
      originalError: error,
      errorValues: errorValues
    };

    return Promise.reject(errRes);
});


export function login(cb, login) {
    axios.post(networkConfig.apiUrl +"/api/v1/login", login)
        .then((response)  =>  {
            console.log("login success");
            return cb({
                ...initialDataState,
                done: true,
                waiting: false,
                loginFail: false,
                loggedIn: true,
            });
        }, (error)  => {
            console.log("login failed", error);
            let loginFail = false;
            if (!error.errorValues.networkError) {
                if (error.originalError.response.status === 401) {
                    loginFail = true;
                }
            }

            cb({
                ...initialDataState,
                loading: false,
                waiting: false,
                loggedIn: false,
                loginFail: loginFail,
                ...error.errorValues
            });
            return false;
        });
}

export function auth(cb) {
    axios.get(networkConfig.apiUrl +"/api/v1/auth", )
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
                loggedIn: false,
                ...error.errorValues
            });
            return false;
        });
}

export function logout(cb) {
    axios.get(networkConfig.apiUrl +"/api/v1/logout", )
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
                ...error.errorValues
            });
            return false;
        });
}

export function serverCMD(cb, cmd) {
    axios.get(networkConfig.apiUrl +"/api/v1/management/" + cmd)
        .then((response)  =>  {
            console.log("serverCMD_Start success");
            return cb({
                ...initialDataState,
                done: true
            });
        }, (error)  => {
            console.log("serverCMD_Start failed", error);

            cb({
                loading: false,
                ...error.errorValues
            });
            return false;
        });
}
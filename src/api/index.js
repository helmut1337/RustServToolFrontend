import axios from 'axios'
import initialDataState from '../store/initialDataState'
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
    axios.post(networkConfig.apiUrl +"/login", login)
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
    axios.get(networkConfig.apiUrl +"/auth", )
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
    axios.get(networkConfig.apiUrl +"/logout", )
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

export function serverCMD_Start(cb) {
    axios.get(networkConfig.apiUrl +"/api/v1/management/start")
        .then((response)  =>  {
            console.log("serverCMD_Start success");
            return cb({
                ...initialDataState,
                done: true
            });
        }, (error)  => {
            console.log("serverCMD_Start failed", error);
            let isError = false;
            let networkError = false;
            if (typeof error.response !== 'undefined') {
                isError = true;
            } else {
                networkError = true;
            }

            cb({
                loading: false,
                networkError: networkError,
                error: isError,
            });
            return false;
        });
}

export function serverCMD_Stop(cb) {
    axios.get(networkConfig.apiUrl +"/api/v1/management/stop")
        .then((response)  =>  {
            console.log("serverCMD_Stop success");
            return cb({
                ...initialDataState,
                done: true
            });
        }, (error)  => {
            console.log("serverCMD_Stop failed", error);
            let isError = false;
            let networkError = false;
            if (typeof error.response !== 'undefined') {
                isError = true;
            } else {
                networkError = true;
            }

            cb({
                loading: false,
                networkError: networkError,
                error: isError,
            });
            return false;
        });
}
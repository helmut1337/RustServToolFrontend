<template>
    <div class="wrapper">
        <div class="container">
            <div class="d-flex justify-content-center h-100" style="margin-top: 20%;">
                <div class="card">
                    <div class="card-header">
                        <h3>Sign In</h3>

                    </div>
                    <div class="card-body">
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="username" v-model="name" v-on:keypress.enter="login">

                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" class="form-control" placeholder="password" v-model="password" v-on:keypress.enter="login">
                            </div>
                            <!--<div class="row align-items-center remember">
                                <input type="checkbox">Remember Me
                            </div>-->
                            <div class="form-group">
                                <button v-on:click="login" class="btn float-right login_btn"><img v-if="requestedLogin.loading" src="../assets/loading_small.gif" class="login-btn-space"><i v-if="!requestedLogin.loading" class="login-btn-space fas fa-sign-in-alt"></i>Login</button>
                            </div>
                    </div>
                    <!--<div class="card-footer">
                        <div class="d-flex justify-content-center links">
                            Don't have an account? Fuck off
                        </div>
                    </div>-->
                </div>
            </div>
        </div>

        <md-snackbar :md-position="snackbar.position" :md-duration="snackbar.isInfinity ? Infinity : snackbar.duration" :md-active.sync="snackbar.showSnackbar" md-persistent class="snackbar-bg-white">
            <span>{{snackbar.msg}}</span>
            <md-button class="md-primary" @click="snackbar.showSnackbar = false">Close</md-button>
        </md-snackbar>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import config from '../config'
    import router from "../router/index";
    export default {

        name: "Login",
        data() {
            return {
                name: "",
                password: "",
                snackbar: {
                    msg: "Test",
                    showSnackbar: false,
                    position: 'center',
                    duration: 4000,
                    isInfinity: false
                }
            }
        },
        mounted() {
            document.title = "Login - " + config.serverName;
            this.auth();
        },
        computed: {
            ...mapGetters({
                requestedLogin: 'requestedLogin',
            }),
            /*isLoggedIn: function () {
                if(this.requestedLogin.loggedIn) {
                    router.push('/');
                }
                return this.requestedLogin.loggedIn;
            }*/
        },
        watch: {
            requestedLogin: function(newLogin) {
                if(!newLogin.waiting && newLogin.loggedIn) {
                    router.push('/');
                }
                if(!newLogin.loading && newLogin.loginFail){
                    this.showSnackbar("Login attempt failed")
                } else if(!newLogin.loading && newLogin.networkError) {
                    this.showSnackbar("Connection error")
                } else if(!newLogin.loading && newLogin.error) {
                    this.showSnackbar("Unknown error")
                }
            }
        },
        methods: {
            ...mapActions({
                login(dispatch) {
                    //let login = {name: 'admin', password: 'test'};

                    let login = {name: this.name, password: this.password};
                    dispatch('login', login)
                },
                auth(dispatch) {
                    dispatch('auth')
                },
            }),
            showSnackbar: function(msg){
                this.snackbar.msg = msg;
                this.snackbar.showSnackbar = true;
            }
        },

    }
</script>

<style>
    body, html {
        background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        font-family: 'Numans', sans-serif;
    }
</style>

<style scoped>
    /* Made with love by Mutiullah Samim*/

    @import url('https://fonts.googleapis.com/css?family=Numans');
    @import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css');

    .container{
        height: 100%;
        align-content: center;
    }

    .card{
        height: 300px;
        margin-top: auto;
        margin-bottom: auto;
        width: 400px;
        background-color: rgba(0,0,0,0.5) !important;
    }

    .social_icon span{
        font-size: 60px;
        margin-left: 10px;
        color: #FFC312;
    }

    .social_icon span:hover{
        color: white;
        cursor: pointer;
    }

    .card-header h3{
        color: white;
    }

    .social_icon{
        position: absolute;
        right: 20px;
        top: -45px;
    }

    .input-group-prepend span{
        width: 50px;
        background-color: #FFC312;
        color: black;
        border:0 !important;
    }

    input:focus{
        outline: 0 0 0 0  !important;
        box-shadow: 0 0 0 0 !important;

    }

    .remember{
        color: white;
    }

    .remember input
    {
        width: 20px;
        height: 20px;
        margin-left: 15px;
        margin-right: 5px;
    }

    .login_btn{
        color: black;
        background-color: #FFC312;
        width: 110px;
    }

    .login_btn:hover{
        color: black;
        background-color: white;
    }

    .login-btn-space {
        margin-right: 7px;
    }

    .links{
        color: white;
    }

    .links a{
        margin-left: 4px;
    }

    .snackbar-bg-white {
        background-color: #fefefe!important;

    }
</style>

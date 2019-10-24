<template>
    <div class="dashboard">

        <div v-if="requestedLogin.waiting" class="loading" style="text-align: center">
            <div class="load-image-container">
                <img src="../assets/loading.gif">
            </div>
        </div>

        <div class="container" v-if="requestedLogin.loggedIn">

            <div class="card" style="margin-top: 5%;">
                <div class="card-header">
                    Console
                    <span class="float-right"><md-button class="md-accent" v-on:click="logout">Logout</md-button></span>
                </div>
                <div class="card-body">
                   <!-- <ServerConsole ref="console" :socket="webSocket"></ServerConsole>-->

                    <ServerConsole ref="console" :socket="webSocket"></ServerConsole>
                    <!--<button v-on:click="addInputToConsole">Lel</button>-->
                </div>
            </div>
            <br />
            <div class="card">
                <div class="card-header">
                    Actions
                    <span class="float-right">
                        <span v-if="socketValues.serverState === constants.STATE_STARTING">Server is starting...</span>
                        <span v-if="socketValues.serverState === constants.STATE_STOPPING">Server is stopping...</span>

                        <img v-if="serverStateLoading" src="../assets/loading_small.gif">
                    </span>
                </div>
                <div class="card-body" style="text-align: center">
                    <md-button :disabled="requestedServerCMD.loading" v-on:click="serverStart" class="md-primary"><md-icon>play_arrow</md-icon>Start</md-button>
                    <md-button :disabled="requestedServerCMD.loading" v-on:click="serverRestart" class="md-primary"><md-icon>replay</md-icon>Restart</md-button>
                    <md-button :disabled="requestedServerCMD.loading" v-on:click="serverStop" class="md-accent"><md-icon>stop</md-icon>Stop</md-button>
                    <md-button :disabled="requestedServerCMD.loading" v-on:click="serverKill" class="md-accent"><md-icon>report</md-icon>Kill</md-button>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            Memory Usage
                        </div>
                        <div class="card-body" style="text-align: center">
                            <MemoryUsage></MemoryUsage>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <md-snackbar :md-position="snackbar.position" :md-duration="snackbar.isInfinity ? Infinity : snackbar.duration" :md-active.sync="snackbar.showSnackbar" md-persistent class="md-accent" v-bind:class="snackbar.classes">
            <span>{{snackbar.msg}}</span>
            <md-button class="md-primary" @click="snackbar.showSnackbar = false" v-if="snackbar.showClose">Close</md-button>
        </md-snackbar>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import networkConfig from '../networkConfig'
    import ServerConsole from '../components/ServerConsole'
    import MemoryUsage from "../components/MemoryUsage";
    import router from "../router/index";
    import store from '../store/index'

    const STATE_STOPPED = 1;
    const STATE_STARTED = 2;
    const STATE_STARTING = 3;
    const STATE_STOPPING = 4;

    export default {
        name: 'Dashboard',
        components: {
            MemoryUsage,
            ServerConsole
        },
        data() {
          return {
              constants: {
                  STATE_STOPPED: 1,
                  STATE_STARTED: 2,
                  STATE_STARTING: 3,
                  STATE_STOPPING: 4,
              },
              authInterval: null,
              webSocket: null,
              socketValues: {
                  serverState: null
              },
              snackbar: {
                  msg: "",
                  showSnackbar: false,
                  position: 'center',
                  duration: 4000,
                  isInfinity: false,
                  showClose: false,
                  classes: {
                      'bg-green': false
                  }
              }
          }
        },
        mounted() {
            document.title = "Dashboard - GoatRust";
            this.auth();

            // Re-Auth every 10 seconds
            this.authInterval = setInterval(function(){
                this.auth();
            }.bind(this), 10000);


        },
        beforeDestroy() {
            clearInterval(this.authInterval);
            if(this.webSocket !== null) {
                this.webSocket.close();
            }
        },
        watch: {
            requestedLogin: function(newLogin) {
                if(!newLogin.waiting && !newLogin.loggedIn) {
                    router.push('login');
                } else

                // Init WebSocket with 500ms delay cwaiting for Console init
                if(this.requestedLogin.loggedIn && this.webSocket === null) {
                   // setTimeout(function () {
                        this.initWebsocket();
                   // }.bind(this), 500);
                }
            },
            requestedServerCMD: function(newReqCMD) {
                if(newReqCMD.done) {
                    switch(newReqCMD.type) {
                        case 'start':
                            this.showSnackbar("Server started", 'success');
                            break;

                        case 'stop':
                            this.showSnackbar("Server stopped", 'success');
                            break;
                    }
                    store.commit('receiveServerCMD', {done: false, type: ""});
                }
            }
        },
        methods: {
            ...mapActions({
                auth(dispatch) {
                    dispatch('auth');
                },
                logout(dispatch) {
                    dispatch('logout');
                },
                serverCMD_Start(dispatch) {
                    dispatch('serverCMD_Start');
                },
                serverCMD_Stop(dispatch) {
                    dispatch('serverCMD_Stop');
                },
            }),
            initWebsocket: function() {
                this.webSocket = new WebSocket(networkConfig.websocketUrl);
                //let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

                this.webSocket.onopen = function(e) {
                    /*alert("[open] Connection established");
                    alert("Sending to server");
                    socket.send("My name is John");*/
                };

                this.webSocket.onmessage = function(event) {
                    //alert(`[message] Data received from server: ${event.data}`);
                    let req = JSON.parse(event.data);
                    console.log("recv websocker msg type: " + req.type)
                    switch(req.type){
                        case 1: // Initial console history
                        case 10: // new console line
                            this.handleWebsocket_ConsoleInput(req.body);
                            break;

                        case 2: // server state
                            console.log("New server state: " + req.body);
                            this.socketValues.serverState = req.body;
                            break;
                    }
                }.bind(this);

                this.webSocket.onclose = function(event) {
                    if (!event.wasClean) {
                        this.showSnackbar("WebSocket-Connection was lost", 'error');
                    }
                }.bind(this);

                this.webSocket.onerror = function(error) {
                    //alert(`[error] ${error.message}`);
                };
            },
            handleWebsocket_ConsoleInput: function(data) {
                const splitted = data.split("\n");
                splitted.forEach(function(line){
                    this.$refs.console.addInput(line);
                }, this);

            },
            addInputToConsole: function() {
                this.$refs.console.addInput("lel");
            },
            showSnackbar: function(msg, color){
                console.log("show snackbar");
                this.snackbar.msg = msg;


                for (let key in this.snackbar.classes){
                    if(this.snackbar.classes.hasOwnProperty(key)){
                        this.snackbar.classes[key] = false;
                    }
                }


                this.snackbar.classes["bg-green"] = false;
                switch (color) {
                    case 'success':
                        this.snackbar.classes["bg-green"] = true;
                        break;

                    case 'error':
                        this.snackbar.classes["bg-red"] = true;
                        break;
                }
                this.snackbar.showSnackbar = true;
            },
            serverStart: function(){
                this.serverCMD_Start();
            },
            serverRestart: function(){
                this.showSnackbar("Server restarted", 'success');
            },
            serverStop: function(){
                this.serverCMD_Stop();
                //this.showSnackbar("Server stopped", 'success');
            },
            serverKill: function(){
                this.showSnackbar("Server killed", 'success');
            }
        },
        computed: {
            ...mapGetters({
                requestedLogin: 'requestedLogin',
                requestedServerCMD: 'requestedServerCMD'
            }),
            serverStateLoading() {
                return this.socketValues.serverState === this.constants.STATE_STARTING || this.socketValues.serverState === this.constants.STATE_STOPPING || this.requestedServerCMD.loading;
            }
        },
    }
</script>

<style lang="scss" scoped>

    @import url('http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
    @import "~vue-material/dist/theme/engine"; // Import the theme engine

    @include md-register-theme("default", (
            primary: md-get-palette-color(blue, A200), // The primary color of your application
            accent: md-get-palette-color(red, A200), // The accent or secondary color
            torag: md-get-palette-color(orange, A200)
    ));

    @import "~vue-material/dist/theme/all"; // Apply the theme

    .md-app {
        max-height: 1200px;
        border: 1px solid rgba(#000, .12);
    }

    // Demo purposes only
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #fff;
    }

    .load-image-container {
        margin-top: 20%;
    }

    .bg-green {
        background-color: green!important;
    }

    .bg-red {
        background-color: red!important;
    }
</style>


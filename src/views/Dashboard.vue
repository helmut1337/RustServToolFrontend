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
                </div>
                <div class="card-body">
                    <ServerConsole></ServerConsole>
                </div>
            </div>
            <br />
            <div class="card">
                <div class="card-header">
                    Actions
                </div>
                <div class="card-body" style="text-align: center">
                    <md-button class="md-primary"><md-icon>play_arrow</md-icon>Start</md-button>
                    <md-button class="md-primary"><md-icon>replay</md-icon>Restart</md-button>
                    <md-button class="md-accent"><md-icon>stop</md-icon>Stop</md-button>
                    <md-button class="md-accent"><md-icon>report</md-icon>Kill</md-button>
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
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import ServerConsole from '../components/ServerConsole'
    import MemoryUsage from "../components/MemoryUsage";
    import router from "../router/index";
    export default {
        name: 'Waterfall',
        components: {
            MemoryUsage,
            ServerConsole
        },
        data() {
          return {
              authInterval: null,

          }
        },
        mounted() {
            this.auth();

            this.authInterval = setInterval(function(){
                this.auth();
            }.bind(this), 3000);

            let socket = new WebSocket("ws://localhost:8180");
            //let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

            socket.onopen = function(e) {
                /*alert("[open] Connection established");
                alert("Sending to server");
                socket.send("My name is John");*/
            };

            socket.onmessage = function(event) {
                //alert(`[message] Data received from server: ${event.data}`);
                let req = JSON.parse(event.data);
                switch(req.type){
                    case "console":
                        console.log("CONSOLE: " + req.data);
                        break;
                }
            };

            socket.onclose = function(event) {
                if (event.wasClean) {
                    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    alert('[close] Connection died');
                }
            };

            socket.onerror = function(error) {
                alert(`[error] ${error.message}`);
            };

        },
        beforeDestroy() {
            clearInterval(this.authInterval);
        },
        watch: {
            requestedLogin: function(newLogin) {
                if(!newLogin.waiting && !newLogin.loggedIn) {
                    router.push('login');
                }
            }
        },
        methods: {
            ...mapActions({
                auth(dispatch) {
                    dispatch('auth');
                },
            }),
        },
        computed: {
            ...mapGetters({
                requestedLogin: 'requestedLogin',
            }),
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
</style>


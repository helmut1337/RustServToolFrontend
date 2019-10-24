<template>
    <VueTerminal
            console-sign=">"
            allow-arbitrary
            height="400px"
            @command="onCliCommand"
            ref="terminal"
    ></VueTerminal>
</template>

<script>
    import VueTerminal from "vue-terminal-ui";

    export default {
        name: "App",
        props: {
            socket: {
                type: WebSocket,
                default: null
            }
        },
        data() {
            return {

            };
        },
        methods: {
            onCliCommand(data, resolve, reject) {
                const cmd = {'type': 1, 'body': data.text};
                this.socket.send(JSON.stringify(cmd));
                console.log(data);
                resolve("");
                /*setTimeout(() => {
                    //resolve("");
                    reject();
                }, 300);*/
            },

            addInput: function(msg) {
                this.$refs.terminal.addLine(msg);
            }
        },
        components: {
            VueTerminal
        }
    };
</script>

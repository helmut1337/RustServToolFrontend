<template>
    <div class="app">
        <div id="chart">
            <apexchart ref="realtimeChart" type=line height=350 :options="chartOptions" :series="series" />
        </div>
        <md-button @click="add">Lel</md-button>
    </div>

</template>

<script>
    export default {
        name: "MemoryUsage",
        data: function() {
            return {
                chartOptions: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                    }
                },
                series: [{
                    name: 'series-1',
                    data: [30, 40, 35, 50, 49, 60, 70, 91]
                }]
            }
        },
        methods: {
            add: function () {
                this.data.append
            }
        }
    }
</script>

<style type="scss" scoped>


</style>
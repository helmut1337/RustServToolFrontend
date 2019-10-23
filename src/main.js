import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import router from "./router/index";
import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial);


import 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

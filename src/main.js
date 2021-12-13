import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// Importing the global css file
import "@/assets/main.css"
import "@/assets/w3.css"
import Slider from "@jeremyhamm/vue-slider"
import axios from "axios"
import VueAxios from "vue-axios"
import ToggleSwitch from "vuejs-toggle-switch"

Vue.use(ToggleSwitch)
Vue.use(VueAxios, axios)
Vue.use(Slider)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

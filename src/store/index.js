import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    main: {
      city: "",
      temp: "",
      humidity: "",
      windspeed: "",
      pressure: "",
    },
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ],
    tempUnit: "",
    coord: {
      lat: "",
      long: "",
    },
  }),
  mutations: {},
  actions: {
    getData({ state, commit }, payload) {
      console.log(state, commit, payload)
    },
  },
  modules: {},
})

<template>
  <div class="bg">
    <div style="height: 350px">
      <div class="row" style="height: 15vh">
        <div class="col-2" style="text-align: center" @click="gotoHome"><i class="fas fa-chevron-left"></i></div>
        <div class="col-8" style="text-align: center">Change Location</div>
        <div class="col-2" style="text-align: center"><i class="fas fa-ellipsis-h"></i></div>
        <div class="wrap">
          <div class="search">
            <input type="text" class="searchTerm" placeholder="Search Location" />
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <l-map
        style="height: 100vh; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet"
// @ is an alias to /src
// import Slider from "@jeremyhamm/vue-slider"
export default {
  name: "Detail",
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null,
      test: "",
      sidebarStatus: false,
      demo: "",
      latitude: "",
      longitude: "",
      cityName: "",
      units: "metric",
      iconw: "",
      weatherdesc: "",
      temp: "",
      humidity: "",
      windspeed: "",
      degree: "\u00B0C",
      st: {},
      selectedMapOption: "",
      myOptions: {
        layout: {
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          selectedColor: "white",
          selectedBackgroundColor: "white",
          borderColor: "black",
          fontFamily: "Poppins",
          fontWeight: "normal",
          fontWeightSelected: "bold",
          squareCorners: false,
          noBorder: true,
        },
        size: {
          fontSize: 1,
          height: 2.5,
          padding: 0.5,
          width: 16,
        },
        items: {
          delay: 0.4,
          preSelected: "Celsius",
          disabled: false,
          labels: [
            { name: "Celsius", color: "rgba(60, 111, 209, 1)", backgroundColor: "white" },
            { name: "Fahrenheit", color: "rgba(60, 111, 209, 1)", backgroundColor: "white" },
          ],
        },
      },
    }
  },
  watch: {
    selectedMapOption() {
      console.log(this.selectedMapOption)
      if (this.selectedMapOption === "Fahrenheit") {
        this.units = "imperial"
        this.getWeatherCurrentLocation()
      } else {
        this.units = "metric"
        this.getWeatherCurrentLocation()
      }
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.$router.push({ name: "Home" })
    // }, 5000)
    this.demo = document.getElementById("demo")
    this.getLocation()

    setTimeout(() => {
      this.getWeatherCurrentLocation()
    }, 1000)
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    gotoHome() {
      this.$router.push({ name: "Home" })
    },

    getLocation() {
      if (navigator.geolocation) {
        // console.log("test ", navigator.geolocation.getCurrentPosition(this.showPosition))
        navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        this.demo.innerHTML = "Geolocation is not supported by this browser."
      }
    },
    showPosition(position) {
      console.log(position)
      // this.demo.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
    },
    async getWeatherCurrentLocation() {
      await this.axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?lat=" +
            this.latitude +
            "&lon=" +
            this.longitude +
            "&appid=fdf871cedaf3413c6a23230372c30a02&units=" +
            this.units
        )
        .then((response) => {
          console.log(response.data)
          // this.$store.dispatch("sendGoal", this.payload)
          this.cityName = response.data.name
          // console.log(response.data.weather[0].icon)
          this.iconw = response.data.weather[0].icon
          this.weatherdesc = response.data.weather[0].description
          this.temp = response.data.main.temp.toFixed(0)
          this.humidity = response.data.main.humidity
          this.windspeed = response.data.wind.speed
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
:root {
  --accent: #04da97;
  --border-width: 6px;
  --border-radius: 55px;
  --font-size: 30px;
}
.bigcard {
  background: linear-gradient(180deg, #3cd18a 0%, #3c6fd1 0.01%, #7ca9ff 100%);
  border-radius: 20px;
  height: 50vh;
}
.smallcard {
  background: white;
  border-radius: 20px;
  height: 10vh;
}
.bg {
  position: absolute;
  width: 100%;
  background: whitesmoke;
  height: 100vh;
  border-radius: 10px;
}
div >>> .navMenu {
  background: linear-gradient(180deg, #3cd18a 0%, #3c6fd1 0.01%, #7ca9ff 100%);
}
.menu {
  width: 40%;
  float: left;
  padding: 2%;
}

.main {
  width: 60%;
  float: left;
  padding: 2%;
}
.w3-sidebar {
  background: linear-gradient(180deg, #3cd18a 0%, #3c6fd1 0.01%, #7ca9ff 100%) !important;
  color: white;
}
.card {
  width: 324px;
  height: 205px;
  background: linear-gradient(90deg, #3cd18a 0%, #3c6fd1 0.01%, #7ca9ff 100%);
  border-radius: 20px;
}
.row::after {
  content: "";
  clear: both;
  display: table;
}

[class*="col-"] {
  float: left;
  padding: 15px;
  /* border: 1px solid red; */
}

.col-1 {
  width: 8.33%;
}
.col-2 {
  width: 16.66%;
}
.col-3 {
  width: 25%;
}
.col-4 {
  width: 33.33%;
}
.col-5 {
  width: 41.66%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33%;
}
.col-8 {
  width: 66.66%;
}
.col-9 {
  width: 75%;
}
.col-10 {
  width: 83.33%;
}
.col-11 {
  width: 91.66%;
}
.col-12 {
  width: 100%;
}

.toggle {
  position: relative;
  border: solid 6px #04da97;
  border-radius: 55px;
  transition: transform cubic-bezier(0, 0, 0.3, 2) 0.4s;
  transform-style: preserve-3d;
  perspective: 800px;
}

.toggle > input[type="radio"] {
  display: none;
}

.toggle > #choice1:checked ~ #flap {
  transform: rotateY(-180deg);
}

.toggle > #choice1:checked ~ #flap > .content {
  transform: rotateY(-180deg);
}

.toggle > #choice2:checked ~ #flap {
  transform: rotateY(0deg);
}

.toggle > label {
  display: inline-block;
  min-width: 170px;
  padding: 30px;
  font-size: 30px;
  text-align: center;
  color: #04da97;
  cursor: pointer;
}

.toggle > label,
.toggle > #flap {
  font-weight: bold;
  text-transform: capitalize;
}

.toggle > #flap {
  position: absolute;
  top: calc(0px - 6px);
  left: 50%;
  height: calc(100% + 6px * 2);
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: #04da97;
  border-top-right-radius: 55px;
  border-bottom-right-radius: 55px;
  transform-style: preserve-3d;
  transform-origin: left;
  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
}

.toggle > #flap > .content {
  color: #333;
  transition: transform 0s linear 0.25s;
  transform-style: preserve-3d;
}
.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: cal(100-20) vh;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #00b4cc;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  width: 90%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

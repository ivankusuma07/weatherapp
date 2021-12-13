<template>
  <div class="bg">
    <!-- <slider
      :width="200"
      format="push"
      direction="left"
      :opacity="0.15"
      :links="[
        { id: 1, text: 'Link 1', url: 'https://github.com' },
        { id: 2, text: 'Link 2', url: 'https://github.com' },
      ]"
    ></slider> -->
    <div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display: none; padding: 5%" id="mySidebar">
      <!-- <button class="w3-bar-item w3-button w3-large" @click="close">Close &times;</button> -->
      <div style="font-size: 1rem">current location</div>
      <div style="font-size: 1.2rem; margin-bottom: 10%"><i class="fas fa-map-marker-alt"></i> {{ cityName }}</div>

      <router-link to="search" style="color: #fbf99e"><i class="fas fa-map-marker-alt"></i> Add Location</router-link>
    </div>
    <div id="main">
      <div class="">
        <button id="openNav" class="w3-button w3-xlarge menu" @click="sideBarStat" style="text-align: left">&#9776;</button>
        <!-- <div class="w3-container">
          <h1>My Page</h1>
        </div> -->
        <!-- <div id="demo"></div> -->
        <div class="main"></div>
        <div v-if="sidebarStatus == false">{{ cityName }}</div>
        <div v-else style="padding-bottom: 30%"></div>
      </div>
    </div>
    <div style="padding: 5%">
      <div class="card" @click="gotoDetails">
        <div class="row">
          <div class="col-6" style="font-weight: bold; font-size: 1.2rem; color: white; float: left; margin-top: 10px">
            {{ weatherdesc }}
          </div>

          <div class="col-6" style="text-align: right !important">
            <img :src="`https://openweathermap.org/img/wn/${iconw}@2x.png`" width="60%" alt="" />
          </div>
        </div>
        <div class="row">
          <div
            class="col-12"
            style="font-family: Poppins Medium; font-style: normal; font-weight: 500; font-size: 1rem; color: white; float: left; margin-top: -20px"
          >
            <i class="fas fa-map-marker-alt"></i> {{ cityName }}
          </div>
        </div>
        <div class="row" style="color: white">
          <div class="col-4">
            <div class="row">
              <div class="col-6" style="font-family: Poppins; font-style: normal; font-weight: bold; font-size: 1.5rem; margin-top: -22px">
                {{ temp }}
              </div>
              <div class="col-6" style="margin-top: -20px; margin-left: -10px">{{ degree }}</div>
            </div>
          </div>
          <div class="col-4" style="font-family: Poppins; font-style: normal; font-weight: 600; font-size: 0.9rem">
            <i class="fas fa-cloud-rain"></i> {{ humidity }} %
          </div>
          <div class="col-4" style="font-family: Poppins; font-style: normal; font-weight: 600; font-size: 0.9rem">
            <i class="fas fa-wind"></i> {{ windspeed }} m/s
          </div>
        </div>
        <!-- <p>The Italian / Austrian Alps</p> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Slider from "@jeremyhamm/vue-slider"
export default {
  name: "Home",
  // components: {
  //   slider: Slider,
  // },
  data() {
    return {
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
    }
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
    gotoDetails() {
      this.$router.push({ name: "Detail" })
    },
    sideBarStat() {
      if (this.sidebarStatus === false) {
        this.open()
      } else {
        this.close()
      }
    },
    open() {
      document.getElementById("main").style.marginLeft = "75%"
      document.getElementById("mySidebar").style.width = "75%"
      document.getElementById("mySidebar").style.display = "block"
      // document.getElementById("openNav").style.display = "none"
      this.sidebarStatus = true
    },
    close() {
      document.getElementById("main").style.marginLeft = "0%"
      document.getElementById("mySidebar").style.display = "none"
      document.getElementById("openNav").style.display = "inline-block"
      this.sidebarStatus = false
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
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
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
.bg {
  position: absolute;
  width: 100%;
  background: linear-gradient(258.12deg, #E5E5E5; 1.16%, rgba(255, 255, 255, 0) 192.15%);
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
</style>

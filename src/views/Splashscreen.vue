<template>
  <div class="bg">
    <div class="center">
      <div class="row">
        <div class="col-12">
          <transition appear name="slide-fade">
            <div style="margin-top: 28vh; text-align: center">
              <img src="../assets/weatherlogo.png" width="100" height="100" alt="weather logo" />
            </div>
          </transition>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="font1">WeatherAPP</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="font2">Get your weather in seconds</p>
        </div>
      </div>
    </div>
    <!-- <h5 class="font2"></h5> -->
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Splash",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      test: "",
    }
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "Home" })
    }, 5000)
  },
  methods: {},
}
</script>

<style scoped>
.bg {
  position: absolute;
  width: 100%;
  background: linear-gradient(180deg, #3cd18a 0%, #3c6fd1 0.01%, #7ca9ff 100%);
  height: 100vh;
  border-radius: 10px;
}
.font1 {
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  color: white;
  display: inline-block;
  font-size: 1.5rem;
}
.center {
  height: 100vh;
  position: relative;
  /* border: 3px solid green;  */
}

.center p {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.font2 {
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  font-size: 0.78rem;
  color: white;
  display: inline-block;
  padding-top: 100px;
}
.slide-fade-enter-active {
  /* transition: opacity 1.5s; */
  transition: all 1.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(40px);
  opacity: 0;
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

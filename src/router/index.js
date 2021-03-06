import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Splash from "../views/Splashscreen.vue"
import Detail from "../views/Details.vue"
import Search from "../views/Search.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "Splash",
    component: Splash,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router

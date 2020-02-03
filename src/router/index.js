import Vue from 'vue'
import VueRouter from 'vue-router'
import discover from '../views/discover/discover.vue'
import login from '../views/login/login.vue'
import home from '../views/Home.vue'
import mVideo from '../views/mVideo/mVideo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/',
        component: discover
      },
      {
        path: 'discover',
        component: discover
      },
      {
        path: 'video',
        component: mVideo
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

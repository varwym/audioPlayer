import Vue from 'vue'
import VueRouter from 'vue-router'
import discover from '@/views/discover/discover.vue'
import login from '@/views/login/login.vue'
import home from '@/views/Home.vue'
import mVideo from '@/views/mVideo/mVideo.vue'
import dayRecommend from '@/views/day-recommend/day-recommend.vue'
import audioPlayer from '@/views/audio-player/audio-player.vue'
import rankList from '@/views/rank-list/rank-list.vue'
import songSheet from '@/views/song-sheet/song-sheet.vue'
import normalRecommend from '@/views/day-recommend/normal-recommend.vue';
import songClassify from '@/views/song-sheet/song-classify.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: discover
      },
      {
        path: '/video',
        component: mVideo
      }
    ]
  },
  {
    path: '/player',
    name: 'player',
    component: audioPlayer
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/dayRecommend',
    name: 'dayRecommend',
    component: dayRecommend
  },
  {
    path: '/normalRecommend',
    name: 'normalRecommend',
    component: normalRecommend
  },
  {
    path: '/rankList',
    name: 'rankList',
    component: rankList
  },
  {
    path: '/songSheet',
    name: 'songSheet',
    component: songSheet
  },
  {
    path: '/songClassify',
    name: 'songClassify',
    component: songClassify
  }
]

const router = new VueRouter({
  linkActiveClass: 'navigation-options-selected',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0,y: 0}
    }
  },  
  base: process.env.BASE_URL,
  routes
})
export default router

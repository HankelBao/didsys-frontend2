import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import Home from './components/Home.vue'

import ScoreDaily from './components/ScoreDaily.vue'
import ScoreRanks from './components/ScoreRanks.vue'
import ScoreMoments from './components/ScoreMoments.vue'

import ScorerSignIn from './components/ScorerSignIn.vue'

import ScorerNav from './components/Scorer/ScorerNav.vue'
import ScorerMyInfo from './components/Scorer/ScorerMyInfo.vue'
import ScorerScore from './components/Scorer/ScorerScore.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const RequestInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})
Vue.use(VueAxios, RequestInstance)

Vue.prototype.$bus = new Vue()

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/scoreboard', component: ScoreDaily },
    { path: '/scoreranks', component: ScoreRanks },
    { path: '/scoremoments', component: ScoreMoments },
    { path: '/scorersignin', component: ScorerSignIn },
    { path: '/scorer', component: ScorerNav, children: [
      { path: 'myinfo', component: ScorerMyInfo },
      { path: 'score', component: ScorerScore }
    ]}
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
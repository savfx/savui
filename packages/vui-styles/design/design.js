import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
  ]
})

let vm = new Vue({
  router,
  render: h => h(App)
})

vm.$mount('#app')

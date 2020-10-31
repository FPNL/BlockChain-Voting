import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
// import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Todo: Update this when publishing
// import drizzleVuePlugin from '@drizzle/vue-plugin'
//
import drizzleVuePlugin from '@drizzle/vue-plugin'
import drizzleOptions from './drizzleOptions'

Vue.use(Vuex)
const store = new Vuex.Store({ state: {} })

Vue.use(drizzleVuePlugin, { store, drizzleOptions })

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')

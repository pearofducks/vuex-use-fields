import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueCompositionApi from '@vue/composition-api'
import { initStore } from '../../index'

Vue.use(VueCompositionApi)
initStore(store)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

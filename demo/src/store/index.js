import Vue from 'vue'
import Vuex from 'vuex'
import { getField, setField } from '../../../index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    llama: 'wombat'
  },
  mutations: {
    setField
  },
  actions: {
  },
  getters: {
    getField
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { getField, setField } from '../../../index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    llama: 'wombat',
    foo: {
      bar: 1,
      baz: 2,
      biz: 3
    }
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

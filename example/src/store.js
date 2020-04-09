import Vuex from 'vuex'
import { setupStore, getField, setField } from '../../index'

export default Vuex.createStore({
  state: {
    itemInRoot: 'i am an item in root',
  },
  mutations: { setField },
  getters: { getField },
  plugins: [ setupStore ],
  modules: {
    a: {
      namespaced: true,
      state: {
        itemInNamespaceA: 'i am in namespace a'
      },
      mutations: { setField },
      getters: { getField }
    }
  }
});

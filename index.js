import { arrayToObject } from './lib/array-to-object'
import { get, set } from './lib/deep-object'
// import { computed } from '@vue/composition-api'
import { computed } from 'vue'

let store

export const setField = (state, { location, value }) => set(state, location, value)
export const getField = state => location => get(state, location)
export const setupStore = _store => store = _store

export const createFieldMapper = ({ getter = 'getField', setter = 'setField' } = {}) => (_fields) => {
  const fields = Array.isArray(_fields) ? arrayToObject(_fields) : _fields
  return Object.entries(fields).reduce((acc, [name, location]) => {
    acc[name] = computed({
      get: () => store.getters[getter](location),
      set: value => store.commit(setter, { location, value })
    })
    return acc
  }, {})
}
export const useFields = createFieldMapper()

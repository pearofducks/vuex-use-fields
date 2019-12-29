import { arrayToObject } from './lib/array-to-object'
import { get, set } from './lib/deep-object'
import { computed } from '@vue/composition-api'

let store

export const setField = (state, { location, value }) => set(state, location, value)
export const getField = state => location => get(state, location)
export const initStore = _store => store = _store

export const useFields = fields => makeFields(Array.isArray(fields) ? arrayToObject(fields, store) : fields)

const makeFields = fields => Object.entries(fields).reduce((acc, [name, location]) => {
  acc[name] = computed({
    get: () => store.getters.getField(location),
    set: value => store.commit('setField', { location, value })
  })
  return acc
}, {})

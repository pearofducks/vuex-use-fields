import { get, set } from './lib/nested-property'
import { computed } from '@vue/composition-api'

let store

export const setField = (state, { location, value }) => set(state, location, value)
export const getField = state => location => get(state, location)
export const initStore = _store => store = _store

export const useFields = _fields => {
  const fields = Array.isArray(_fields) ? arrayToObject(_fields) : _fields
  return makeFields(fields)
}

const makeFields = fields => Object.entries(fields).reduce((acc, [name, location]) => {
  acc[name] = computed({
    get: () => store.getters.getField(location),
    set: value => store.commit('setField', { location, value })
  })
  return acc
}, {})

const arrayToObject = (fields = []) => fields.reduce((acc, path) => {
  const key = path.split('.').pop()
  if (acc[key]) throw new Error(`The key \`${key}\` is already in use.`)
  acc[key] = path
  return acc
}, {})

import { get } from './deep-object'

export const arrayToObject = (fields = [], store) => fields.reduce((acc, path) => {
  const key = path.split('.').pop()
  if (key === '*') {
    const state = store.state
    const pathWithNoSplat = path.substring(0, path.indexOf('.*'))
    const splatPaths = Object.keys(get(state, pathWithNoSplat)).map(k => pathWithNoSplat + '.' + k)
    return Object.assign(acc, arrayToObject(splatPaths))
  }
  if (acc[key]) throw new Error(`The key \`${key}\` is already in use.`)
  acc[key] = path
  return acc
}, {})

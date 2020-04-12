// empty strings can happen on paths like a.b[0]
const notEmpty = e => e.length
export const splitPath = path => path.split(/[\/.[\]]+/).filter(notEmpty)

const _get = (state, arr) => arr.reduce((prev, key) => prev[key], state)
export const get = (state, location) => _get(state, splitPath(location))
export const set = (state, location, value) => splitPath(location).reduce((prev, key, index, array) => {
  if (array.length === index + 1) prev[key] = value
  return prev[key]
}, state)

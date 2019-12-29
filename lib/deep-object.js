const split = path => path.split(/[.[\]]+/)

export const get = (state, location) => split(location).reduce((prev, key) => prev[key], state)
export const set = (state, location, value) => split(location).reduce((prev, key, index, array) => {
  if (array.length === index + 1) prev[key] = value
  return prev[key]
}, state)

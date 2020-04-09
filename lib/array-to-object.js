import { splitPath } from './deep-object'

export const arrayToObject = fields => fields.reduce((acc, path) => {
  acc[splitPath(path).pop()] = path
  return acc
}, {})

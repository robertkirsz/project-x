export default (keys = [], values = {}, options = {}) => {
  let result = true

  for (let index in keys) {
    const key = keys[index]
    const value = values[key]

    if (options[key]) {
      result = options[key](value)
    } else if ([null, undefined, ''].includes(value)) {
      result = false
    }
  }

  return result
}

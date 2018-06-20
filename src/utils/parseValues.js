export default (string, values) => {
  let result = string

  Object.keys(values).forEach(key => {
    const regexp = new RegExp(`{${key}}`, 'g')
    result = result.replace(regexp, values[key])
  })

  return result
}

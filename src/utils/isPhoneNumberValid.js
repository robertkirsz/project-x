export default value => {
  if (value === null || value === undefined) return false
  if (value.length !== 10) return false
  if (value.includes('_')) return false

  return true
}

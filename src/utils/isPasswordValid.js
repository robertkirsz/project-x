export default value => {
  // Minimum length
  if (value.length < 6) return false
  // Various case
  if (value.toLowerCase() === value) return false
  // Numbers
  if (!/\d/.test(value)) return false
  // Special characters
  if (!/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) return false

  return true
}

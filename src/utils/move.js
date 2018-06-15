export default (value, modifier, max, min = 0) => {
  const newValue = value + modifier
  if (newValue < 0) return 0
  if (newValue > max) return max
  return newValue
}

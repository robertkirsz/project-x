export default (currentPath, direction = 'next', routes = []) => {
  if (!routes || !['next', 'previous'].includes(direction)) return currentPath

  let path = currentPath
  const currentRouteIndex = routes.findIndex(route => route === currentPath)

  if (direction === 'next') {
    const nextRoute = routes[currentRouteIndex + 1]
    if (nextRoute) path = nextRoute
  }

  if (direction === 'previous') {
    const previousRoute = routes[currentRouteIndex - 1]
    if (previousRoute) path = previousRoute
  }

  return path
}

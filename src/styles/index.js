import { css, injectGlobal } from 'styled-components'

// [0 - smallOnly - 639]
// [0 ------ mediumDown ------ 1023]
//                     [640 - mediumUp - ∞]
//                                 [1024 - largeUp - ∞]

export const queries = [
  { name: 'smallOnly', value: '(max-width: 639px)' },
  { name: 'mediumDown', value: '(max-width: 1023px)' },
  { name: 'mediumUp', value: '(min-width: 640px)' },
  { name: 'largeUp', value: '(min-width: 1024px)' }
]

// Iterate through all the queries and create a media template for each one
export const sizes = queries.reduce(
  (result, query) => ({
    ...result,
    [query.name]: (...args) => css`
      @media only screen and ${query.value} {
        ${css(...args)};
      }
    `
  }),
  {}
)

injectGlobal`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    cursor: default;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  * {
    user-select: none;
    cursor: inherit;
  }

  button, a {
    cursor: pointer;
  }
`

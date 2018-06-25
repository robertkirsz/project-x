import { css, injectGlobal } from 'styled-components'
import Lola from 'fonts/FSLola-Medium.woff'

import './transitions'

export const colors = {
  red: '#e41509',
  darkRed: '#cc0915',
  green: '#20a134',
  blue: '#0976bd',
  black: '#1f1a15',
  orange: '#f39100'
}

// [0 - smallOnly - 639]
// [0 ------ mediumDown ------ 1023]
//                     [640 - mediumUp - ∞]
//                                 [1024 - largeUp - ∞]

// TODO: remove?

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
  @font-face {
    font-family: 'Lola';
    src: url(${Lola}) format('woff');
  }

  html {
    height: 100%;
  }

  body {
    font-family: Lola, sans-serif;
    height: 100%;
    background: white !important; /* TODO */
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
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  button, a {
    cursor: pointer;
  }
`

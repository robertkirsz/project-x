import { injectGlobal } from 'styled-components'
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
    background: white !important;
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

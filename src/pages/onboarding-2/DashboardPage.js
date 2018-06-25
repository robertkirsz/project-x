import React from 'react'
import { Div } from 'styled-kit'

import dashboard1 from 'assets/2/dashboard1.png'
import dashboard2 from 'assets/2/dashboard2.png'

export default () => <Background />

const Background = Div.extend`
  flex: 1;
  background-image: url(${dashboard2}), url(${dashboard1});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom, center top;
`

import React, { Component } from 'react'
import { Div } from 'styled-kit'

import { H1 } from 'components/Typography'

import logo from 'assets/logo.svg'
import motife from 'assets/motife-expanded.png'

export default class IntroPage extends Component {
  goNext = () => this.props.history.push('/onboarding-2/usp')

  render = () => (
    <Background onClick={this.goNext}>
      <H1 center style={{ margin: '100px auto 0' }}>
        <strong>Work in progress</strong>
      </H1>
    </Background>
  )
}

const Background = Div.extend`
  flex: 1;
  background: url(${logo}) center center no-repeat, url(${motife}) center bottom no-repeat;
  background-size: auto, contain;
`

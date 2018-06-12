import React, { Component } from 'react'
import styled from 'styled-components'

import logo from 'assets/logo.svg'
import motife from 'assets/motife-expanded.svg'

export default class IntroPage extends Component {
  goNext = () => this.props.history.push('/usp')

  render = () => <Background onClick={this.goNext} />
}

const Background = styled.div`
  flex: 1;
  background: url(${logo}) center center no-repeat, url(${motife}) center bottom no-repeat;
  background-size: auto, contain;
`

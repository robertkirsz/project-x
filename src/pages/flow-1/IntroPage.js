import React, { Component } from 'react'
import styled from 'styled-components'

import logo from 'assets/logo.svg'
import motife from 'assets/motife-expanded.png'

export default class IntroPage extends Component {
  timeout = null

  componentDidMount() {
    this.timeout = setTimeout(this.goNext, 2500)
  }

  componentWillUnmount = () => clearTimeout(this.timeout)

  goNext = () => this.props.history.push('/onboarding-1/usp')

  render = () => <Background onClick={this.goNext} />
}

const Background = styled.div`
  flex: 1;
  background: url(${logo}) center center no-repeat, url(${motife}) center bottom no-repeat;
  background-size: auto, contain;
`

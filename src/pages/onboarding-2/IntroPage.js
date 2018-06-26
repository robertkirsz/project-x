import React, { Component } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import Background from 'components/IntroBackground'

import logo from 'assets/logo.svg'
import pattern from 'assets/2/background-pattern.svg'

export default class IntroPage extends Component {
  timeout = null

  state = {
    mounted: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ mounted: true })

      this.timeout = setTimeout(() => {
        this.setState({ mounted: false })

        this.timeout = setTimeout(() => {
          this.goNext()
        }, 800)
      }, 3500)
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  goNext = () => this.props.history.push('/onboarding-2/usp/1')

  render = () => (
    <Wrapper>
      <Pattern show={this.state.mounted} />
      <Logo show={this.state.mounted} />
      <Background />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
`

const Pattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${pattern});
  transition: 0.3s;
  opacity: ${props => props.show ? 0.2 : 0};
  z-index: 11;
`

const Logo = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  background: white url(${logo}) no-repeat center center;
  background-size: 184px;
  box-shadow: 0 0 0 10px ${rgba('white', 0.2)}, 0 17px 10px 0 ${rgba('black', 0.1)};
  border-radius: 50%;
  z-index: 12;
  transition: 0.5s;
  opacity: 0;
  transform: scale(0);

  ${props =>
    props.show &&
    `
    opacity: 1;
    transform: scale(1);
  `};
`

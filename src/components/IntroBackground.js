import React, { Component } from 'react'
import styled from 'styled-components'

import { colors } from 'styles'

export default class Background extends Component {
  timeout = null

  state = {
    stripesStyles: { alignItems: 'flex-start' },
    heights: [0, 0, 0, 0, 0, 0]
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ heights: ['100%', '100%', '100%', '100%', '100%', '100%'] })

      this.timeout = setTimeout(() => {
        this.setState({ stripesStyles: { alignItems: 'flex-end' }, heights: [0, 0, 0, 0, 0, 0] })
      }, 2000)
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { stripesStyles } = this.state
    const [red, black, orange, darkRed, blue, green] = this.state.heights

    return (
      <Wrapper>
        <Stripes style={stripesStyles}>
          <Red style={{ height: red }} />
          <Black style={{ height: black }} />
          <Orange style={{ height: orange }} />
          <DarkRed style={{ height: darkRed }} />
          <Blue style={{ height: blue }} />
          <Green style={{ height: green }} />
        </Stripes>
      </Wrapper>
    )
  }
}

const Stripes = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  pointer-events: none;
`

const Stripe = styled.div`
  transition: height 0.5s;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`

const Red = styled(Stripe)`
  width: 28%;
  background: ${colors.red};
  transition-delay: 0.8s;
`

const Black = styled(Stripe)`
  width: 4%;
  background: ${colors.black};
  transition-delay: 0.7s;
`

const Orange = styled(Stripe)`
  width: 22%;
  background: ${colors.orange};
  transition-delay: 0.3s;
`

const DarkRed = styled(Stripe)`
  width: 16%;
  background: ${colors.darkRed};
  transition-delay: 0.2s;
`

const Blue = styled(Stripe)`
  width: 4%;
  background: ${colors.blue};
  transition-delay: 1s;
`

const Green = styled(Stripe)`
  width: 26%;
  background: ${colors.green};
  transition-delay: 0s;
`

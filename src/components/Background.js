import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'

import { colors } from 'styles'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const isUspPage = pathname => pathname.indexOf('/onboarding-2/usp/') === 0
const getRandomHeights = () => [...Array(6)].map(() => getRandomInt(12, 40))

class Background extends Component {
  static getDerivedStateFromProps = (props, state) =>
    !isUspPage(props.location.pathname) && state.heights.length ? { heights: [] } : null

  state = { heights: isUspPage(this.props.location.pathname) ? getRandomHeights() : [] }

  componentDidUpdate(prevProps) {
    if (isUspPage(this.props.location.pathname) && prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ heights: getRandomHeights() })
    }
  }

  render() {
    const { children, location } = this.props
    const [red, black, orange, darkRed, blue, green] = this.state.heights

    const isIntroPage = location.pathname === '/onboarding-2/intro'

    return (
      <Wrapper>
        <Content>{children}</Content>
        <Stripes>
          <Red style={{ height: isIntroPage ? '100%' : red }} />
          <Black style={{ height: isIntroPage ? '100%' : black }} />
          <Orange style={{ height: isIntroPage ? '100%' : orange }} />
          <DarkRed style={{ height: isIntroPage ? '100%' : darkRed }} />
          <Blue style={{ height: isIntroPage ? '100%' : blue }} />
          <Green style={{ height: isIntroPage ? '100%' : green }} />
        </Stripes>
      </Wrapper>
    )
  }
}

export default withRouter(Background)

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 2;
`

const Stripes = styled.div`
  display: flex;
  align-items: flex-end;

  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const Stripe = styled.div`
  height: 6px;
  transition: height 0.3s;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${props => props.fullScreen && css`${Stripe} { height: 100%; }`};
`

const Red = styled(Stripe)`
  width: 28%;
  background: ${colors.red};
`

const Black = styled(Stripe)`
  width: 4%;
  background: ${colors.black};
`

const Orange = styled(Stripe)`
  width: 22%;
  background: ${colors.orange};
`

const DarkRed = styled(Stripe)`
  width: 16%;
  background: ${colors.darkRed};
`

const Blue = styled(Stripe)`
  width: 4%;
  background: ${colors.blue};
`

const Green = styled(Stripe)`
  width: 26%;
  background: ${colors.green};
`

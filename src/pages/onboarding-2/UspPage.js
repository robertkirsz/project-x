import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { Div } from 'styled-kit'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import move from 'utils/move'
import { withTexts } from 'providers/TextProvider'

import { H1, H2 } from 'components/Typography'
import Button from 'components/Button'
import Pagination from 'components/Pagination'
import Swiper from 'components/Swiper'

import image1 from 'assets/2/usp-1.gif'
import image2 from 'assets/2/usp-2.gif'
import image3 from 'assets/2/usp-3.gif'
import image4 from 'assets/2/usp-4.gif'
import image5 from 'assets/2/usp-5.gif'

const childFactoryCreator = classNames => child => React.cloneElement(child, { classNames })

const Screen = ({ image, title, subtitle }) => (
  <Div flex={1} listTop column itemsCenter padding="0 16px">
    <Image src={image} />
    <H1 center>{title}</H1>
    <H2 center>{subtitle}</H2>
  </Div>
)

class UspPage extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    const currentSlide = parseInt(props.match.params.index, 10) - 1
    const direction = currentSlide > state.currentSlide ? 'right' : 'left'

    return currentSlide !== state.currentSlide ? { currentSlide, direction } : null
  }

  timeout = null

  state = {
    currentSlide: parseInt(this.props.match.params.index, 10) - 1,
    direction: 'right',
    show: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ show: true }), 300)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  goToSlide = index => event => {
    if (index === this.state.currentSlide) return

    this.props.history.replace(`/onboarding-2/usp/${index + 1}`)
  }

  handleButtonClick = () => {
    if (this.state.currentSlide === 4) {
      return this.setState({ show: false }, () => {
        this.timeout = setTimeout(() => this.props.history.push('/onboarding-2/first-login/phone-number'), 500)
      })
    }

    this.props.history.replace(`/onboarding-2/usp/${this.state.currentSlide + 2}`)
  }

  render() {
    const { texts, location } = this.props
    const { currentSlide, direction } = this.state

    const t = texts.onboarding1.usp

    return (
      <Swiper
        onSwipeLeft={this.goToSlide(move(currentSlide, 1, 4))}
        onSwipeRight={this.goToSlide(move(currentSlide, -1, 4))}
      >
        <Div
          flex={1}
          column
          itemsCenter
          padding="24px 0 0"
          style={{ transition: '0.3s', opacity: this.state.show ? 1 : 0 }}
        >
          <Pagination small size={5} value={currentSlide} onChange={this.goToSlide} />

          <TransitionGroup component={AnimationWrapper} childFactory={childFactoryCreator(`fade-${direction}`)}>
            <CSSTransition key={location.key} classNames={`fade-${direction}`} timeout={500}>
              <Switch location={location}>
                <Route path="/onboarding-2/usp/1">
                  <Screen image={image1} title={t[0]} subtitle={t[1]} />
                </Route>

                <Route path="/onboarding-2/usp/2">
                  <Screen image={image2} title={t[2]} subtitle={t[3]} />
                </Route>

                <Route path="/onboarding-2/usp/3">
                  <Screen image={image3} title={t[4]} subtitle={t[5]} />
                </Route>

                <Route path="/onboarding-2/usp/4">
                  <Screen image={image4} title={t[6]} subtitle={t[7]} />
                </Route>

                <Route path="/onboarding-2/usp/5">
                  <Screen image={image5} title={t[8]} subtitle={t[9]} />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>

          <Button onClick={this.handleButtonClick} style={{ margin: 'auto 16px 48px' }}>
            {this.state.currentSlide === 4 ? t[10] : texts.misc.continue}
          </Button>
        </Div>
      </Swiper>
    )
  }
}

export default withTexts(UspPage)

const AnimationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
`

const Image = styled.img.attrs({ alt: '' })`
  height: 230px;
`

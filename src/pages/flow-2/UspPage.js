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

import image1 from 'assets/2/usp-1.png'
import image2 from 'assets/2/usp-2.png'
import image3 from 'assets/2/usp-3.png'
import image4 from 'assets/2/usp-4.png'

const getSlideIndex = pathname => parseInt(pathname.slice(-1), 10) - 1

const childFactoryCreator = classNames => child => React.cloneElement(child, { classNames })

const Screen = ({ image, title, subtitle }) => (
  <Div flex={1} column itemsCenter padding="0 16px">
    <Image src={image} />
    <H1 center mTop={16}>
      {title}
    </H1>
    <H2 center mTop={8}>
      {subtitle}
    </H2>
  </Div>
)

class UspPage2 extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    const currentSlide = getSlideIndex(props.location.pathname)
    const direction = currentSlide > state.currentSlide ? 'right' : 'left'

    return currentSlide !== state.currentSlide ? { currentSlide, direction } : null
  }

  state = {
    currentSlide: getSlideIndex(this.props.location.pathname),
    direction: 'right'
  }

  goToSlide = index => event => {
    if (index === this.state.currentSlide) return

    this.props.history.push(`/onboarding-2/usp/${index + 1}`)
  }

  goToRoute = path => event => this.props.history.push(path)

  render() {
    const { texts, location } = this.props
    const { currentSlide, direction } = this.state

    const t = texts.onboarding1.usp

    return (
      <Swiper
        onSwipeLeft={this.goToSlide(move(currentSlide, 1, 3))}
        onSwipeRight={this.goToSlide(move(currentSlide, -1, 3))}
      >
        <Div flex={1} column itemsCenter padding="24px 0 0">
          <Pagination small size={4} value={currentSlide} onChange={this.goToSlide} />

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
              </Switch>
            </CSSTransition>
          </TransitionGroup>

          <Button
            onClick={
              currentSlide === 3 ? this.goToRoute('/onboarding-2/step-1') : this.goToSlide(move(currentSlide, 1, 3))
            }
            style={{ margin: 'auto 16px 48px' }}
          >
            {t[8]}
          </Button>
        </Div>
      </Swiper>
    )
  }
}

export default withTexts(UspPage2)

const AnimationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
  position: relative;
  overflow: hidden;
`

const Image = styled.img.attrs({ alt: '' })`
  height: 200px;
`

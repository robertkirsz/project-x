import React, { Component } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { Div } from 'styled-kit'

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

class UspPage2 extends Component {
  static getDerivedStateFromProps(props, state) {
    const currentSlide = getSlideIndex(props.location.pathname)
    return currentSlide !== state.currentSlide ? { currentSlide } : null
  }

  state = { currentSlide: getSlideIndex(this.props.location.pathname) }

  goToSlide = index => event => this.props.history.push(`/onboarding-2/usp/${index + 1}`)

  render() {
    const { texts } = this.props
    const { currentSlide } = this.state

    const t = texts.onboarding1.usp

    return (
      <Swiper
        onSwipeLeft={this.goToSlide(move(currentSlide, 1, 3))}
        onSwipeRight={this.goToSlide(move(currentSlide, -1, 3))}
      >
        <Div flex={1} column itemsCenter padding="24px 16px">
          <Pagination small size={4} value={currentSlide} onChange={this.goToSlide} />

          <Switch>
            <Route path="/onboarding-2/usp/1">
              <Div flex={1} column itemsCenter padding="30px 0">
                <Image src={image1} />
                <H1 center mTop={16}>
                  {t[0]}
                </H1>
                <H2 center mTop={8}>
                  {t[1]}
                </H2>
                <Button onClick={() => this.props.history.push('/onboarding-2/usp/2')} style={{ marginTop: 'auto' }}>
                  {t[8]}
                </Button>
              </Div>
            </Route>

            <Route path="/onboarding-2/usp/2">
              <Div flex={1} column itemsCenter padding="30px 0">
                <Image src={image2} />
                <H1 center mTop={16}>
                  {t[2]}
                </H1>
                <H2 center mTop={8}>
                  {t[3]}
                </H2>
                <Button onClick={() => this.props.history.push('/onboarding-2/usp/3')} style={{ marginTop: 'auto' }}>
                  {t[8]}
                </Button>
              </Div>
            </Route>

            <Route path="/onboarding-2/usp/3">
              <Div flex={1} column itemsCenter padding="30px 0">
                <Image src={image3} />
                <H1 center mTop={16}>
                  {t[4]}
                </H1>
                <H2 center mTop={8}>
                  {t[5]}
                </H2>
                <Button onClick={() => this.props.history.push('/onboarding-2/usp/4')} style={{ marginTop: 'auto' }}>
                  {t[8]}
                </Button>
              </Div>
            </Route>

            <Route path="/onboarding-2/usp/4">
              <Div flex={1} column itemsCenter padding="30px 0">
                <Image src={image4} />
                <H1 center mTop={16}>
                  {t[6]}
                </H1>
                <H2 center mTop={8}>
                  {t[7]}
                </H2>
                <Button onClick={() => this.props.history.push('/onboarding-2/step-1')} style={{ marginTop: 'auto' }}>
                  {t[8]}
                </Button>
              </Div>
            </Route>
          </Switch>
        </Div>
      </Swiper>
    )
  }
}

export default withTexts(UspPage2)

const Image = styled.img.attrs({ alt: '' })`
  display: block;
  height: 203px;
`

import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Div } from 'styled-kit'

import move from 'utils/move'
import { withTexts } from 'providers/TextProvider'

import { H1, H2 } from 'components/Typography'
import Button from 'components/Button'
import Pagination from 'components/Pagination'
import Swiper from 'components/Swiper'

import logo from 'assets/logo.svg'
import image1 from 'assets/usp-1.png'
import image2 from 'assets/usp-2.png'
import image3 from 'assets/usp-3.png'
import image4 from 'assets/usp-4.png'
import image5 from 'assets/usp-5.png'

class UspPage extends Component {
  state = { currentSlide: 0 }

  goToSlide = index => event => this.setState({ currentSlide: index })

  render() {
    const { texts } = this.props
    const { currentSlide } = this.state

    const t = texts.onboarding1.usp

    return (
      <Div flex={1} column itemsCenter padding="0 16px 30px">
        <Header>
          <SkipButton to="/onboarding-1/step-1">{texts.misc.skip}</SkipButton>
        </Header>

        <Swiper
          onSwipeLeft={this.goToSlide(move(currentSlide, 1, 4))}
          onSwipeRight={this.goToSlide(move(currentSlide, -1, 4))}
        >
          <Div flex={1}>
            {currentSlide === 0 && (
              <Div flex={1} column itemsCenter padding={30}>
                <Image src={image1} />
                <H1 center mTop={24}>
                  {t[0]}
                </H1>
                <H2 center mTop={16}>
                  {t[1]}
                </H2>
              </Div>
            )}

            {currentSlide === 1 && (
              <Div flex={1} column itemsCenter padding={30}>
                <Image src={image2} />
                <H1 center mTop={24}>
                  {t[2]}
                </H1>
                <H2 center mTop={16}>
                  {t[3]}
                </H2>
              </Div>
            )}

            {currentSlide === 2 && (
              <Div flex={1} column itemsCenter padding={30}>
                <Image src={image3} />
                <H1 center mTop={24}>
                  {t[4]}
                </H1>
                <H2 center mTop={16}>
                  {t[5]}
                </H2>
              </Div>
            )}

            {currentSlide === 3 && (
              <Div flex={1} column itemsCenter padding={30}>
                <Image src={image4} />
                <H1 center mTop={24}>
                  {t[6]}
                </H1>
                <H2 center mTop={16}>
                  {t[7]}
                </H2>
              </Div>
            )}

            {currentSlide === 4 && (
              <Div flex={1} column itemsCenter padding={30}>
                <Image src={image5} />
                <H1 center mTop={24}>
                  {t[8]}
                </H1>
                <H2 center mTop={16}>
                  {t[9]}
                </H2>
              </Div>
            )}
          </Div>
        </Swiper>

        {currentSlide < 4 && <Pagination size={5} value={currentSlide} onChange={this.goToSlide} />}

        {currentSlide === 4 && <Button onClick={() => this.props.history.push('/onboarding-1/step-1')}>{t[10]}</Button>}
      </Div>
    )
  }
}

export default withTexts(UspPage)

const Header = styled.header`
  flex: none;
  display: flex;
  align-items: center;
  align-self: stretch;
  height: 46px;
  background: url(${logo}) center center no-repeat;
  background-size: 78px;
`

const SkipButton = styled(Link)`
  font-size: 16px;
  color: #959595;
  margin-left: auto;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
`

const Image = styled.img.attrs({ alt: '' })`
  display: block;
  height: 50vh;
  max-height: 230px;
`

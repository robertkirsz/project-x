import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'
import parseValues from 'utils/parseValues'

import Button from 'components/Button'
import { H2 } from 'components/Typography'

import pattern from 'assets/2/background-pattern.svg'
import cardSample from 'assets/2/card-sample.svg'
import photoPreview from 'assets/2/photo-preview.png'

class FinishPage extends Component {
  state = {}

  render() {
    const { texts } = this.props

    return (
      <Background flex={1} column itemsCenter padding="110px 16px 32px">
        <Photo src={photoPreview} alt="" />

        <Title
          dangerouslySetInnerHTML={{
            __html: parseValues(texts.onboarding2.other[12], {
              userName: `<strong>${sessionStorage.getItem('firstName')} ${sessionStorage.getItem('lastName')},</strong>`
            })
          }}
        />

        <Div listLeft={24} itemsStart mTop="auto">
          <img src={cardSample} alt="" />
          <H2>{texts.onboarding2.other[13]}</H2>
        </Div>

        <Button
          onClick={() => this.props.history.push('/dashboard')}
          style={{ marginTop: 37 }}
          secondary
        >
          {texts.onboarding2.other[14]}
        </Button>
      </Background>
    )
  }
}

export default withTexts(FinishPage)

const Background = Div.extend`
  background: url(${pattern});
`

const Title = H2.extend`
  flex-direction: column;
  font-weight: bold;
  max-width: 70vw;
  text-align: center;

  > strong {
    width: 100vw;
    font-size: 1.25em;
  }
`

const Photo = styled.img`
  width: 100%;
  max-width: 200px;
`

import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'

import Button from 'components/Button'

import pattern from 'assets/2/background-pattern.svg'

class FinishPage extends Component {
  state = {}

  render () {
    const { texts } = this.props

    return (
      <Background flex={1} column itemsCenter padding="128px 16px 32px">
        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-2/card')}
          style={{ marginTop: 'auto' }}
          secondary
        >
          {texts.onboarding2.other[12]}
        </Button>
      </Background>
    )
  }
}

export default withTexts(FinishPage)

const Background = Div.extend`
  background: url(${pattern})
`

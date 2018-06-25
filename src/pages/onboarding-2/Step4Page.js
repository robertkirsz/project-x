import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'

class Step4Page extends Component {
  state = {}

  change = name => value => this.setState({ [name]: value })

  render() {
    const { texts } = this.props

    return (
      <Div flex={1} column itemsCenter padding="30px 16px" relative>
        <Content>
          <Text>{texts.onboarding2.other[10]}</Text>
          <Text>{texts.onboarding2.other[11]}</Text>
        </Content>

        <Picture></Picture>
      </Div>
    )
  }
}

export default withTexts(Step4Page)

const Content = Div.extend``
const Picture = Div.extend``

const Text = styled.p`
  font-family: Roboto;
  font-size: 14px;
  color: white;
  letter-spacing: 0;
  text-align: center;
  line-height: 20px;
  padding: 0;
  margin: 0;
`

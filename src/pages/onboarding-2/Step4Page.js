import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'

import person from 'assets/person.jpg'
import cameraButton from 'assets/2/camera-button.svg'
import photoMask from 'assets/2/photo-mask.svg'

class Step4Page extends Component {
  state = {}

  change = name => value => this.setState({ [name]: value })

  render() {
    const { texts } = this.props

    return (
      <Div flex={1} column itemsCenter padding="150px 16px 30px" relative>
        <Content column itemsCenter>
          <Text>{texts.onboarding2.other[10]}</Text>
          <Text>{texts.onboarding2.other[11]}</Text>
        </Content>

        <Picture></Picture>
      </Div>
    )
  }
}

export default withTexts(Step4Page)

const Content = Div.extend`
  position: relative;
  z-index: 2;
`

const Picture = Div.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${photoMask}) no-repeat, url(${person}) no-repeat;
  background-size: cover;
  z-index: 1;
`

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

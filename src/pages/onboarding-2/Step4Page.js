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
      <Div flex={1} column itemsCenter padding="128px 16px 24px" relative>
        <Content flex={1} column itemsCenter>
          <Text>{texts.onboarding2.other[10]}</Text>
          <Text style={{ marginTop: 'auto' }}>{texts.onboarding2.other[11]}</Text>
          <CameraButton onClick={() => this.props.history.push('/onboarding-2/finish')} />
        </Content>

        <Picture />
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
  background-position: center 70px, center 80px;
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

const CameraButton = styled.img.attrs({ src: cameraButton, alt: '' })`
  margin: 16px auto 0;
  cursor: pointer;
`

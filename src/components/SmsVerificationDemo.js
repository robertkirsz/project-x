import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import _random from 'lodash/random'
import { placeholder } from 'polished'

import SmsDialog from 'components/SmsDialog'
import { Link } from 'components/Typography'

import person2 from 'assets/person2.jpg'
import logo from 'assets/id-now-logo.svg'

const PIN_LENGTH = 6

export default class SmsVerificationDemo extends Component {
  timeout = null

  state = {
    pin: '',
    generatedPin: '',
    showSmsDialog: false
  }

  componentDidMount() {
    this.timeout = setTimeout(this.generatePin, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  generatePin = () => {
    const generatedPin = Array(PIN_LENGTH)
      .fill(null)
      .map(() => _random(0, 9))
      .join('')

    this.setState({ showSmsDialog: true, generatedPin })
  }

  render() {
    return (
      <Wrapper>
        <Picture />

        <Logo />

        <Div column listTop={16} itemsStart mTop="auto">
          <Title>SMS Code</Title>

          <Body>
            Finally, you now have to enter the ident code. This code has been received as a SMS to the number
            +491234567899.
          </Body>

          <Body>
            Haven’t recieved an SMS? <Link>We can send it again</Link>
          </Body>
        </Div>

        <Input placeholder="type an indent code" />

        <Button>Enter</Button>

        <SmsDialog
          isVisible={this.state.showSmsDialog}
          pin={this.state.generatedPin}
          onClick={() => this.setState({ showSmsDialog: false })}
        />
      </Wrapper>
    )
  }
}

const Wrapper = Div.extend`
  flex: 1;
  position: relative;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
`

const Input = styled.input`
  margin-top: auto;
  background: white;
  border: 1px solid #979797;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  font-size: 16px;
  letter-spacing: -0.29px;
  height: 46px;
  width: 100%;
  margin-top: 48px;
  padding: 0 8px;

  ${placeholder({ color: '#CACACA', fontStyle: 'italic' })};
`

const Logo = styled.img.attrs({ src: logo, alt: '' })``

const Picture = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 96px;
  height: 128px;
  background: #d8d8d8 url(${person2}) no-repeat center top;
  background-size: 140px;
  border: 2px solid white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const Title = styled.div`
  font-size: 16px;
  color: #f39100;
  letter-spacing: -0.29px;
  line-height: 19px;
`

const Body = styled.div`
  font-size: 14px;
  color: #1f1a15;
  letter-spacing: -0.25px;
  line-height: 19px;
`

const Button = styled.button`
  margin-top: 48px;
  height: 48px;
  background: #f39100;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  text-transform: uppercase;
  font-size: 18px;
  color: white;
  letter-spacing: -0.32px;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
`

import React, { Component } from 'react'
import { Div } from 'styled-kit'
import _random from 'lodash/random'

import SmsDialog from 'components/SmsDialog'

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

  render () {
    return (
      <Wrapper>
        {this.props.children}
        <SmsDialog
          isVisible={this.state.showSmsDialog}
          pin={this.state.generatedPin}
          onClick={() => this.setState({ showSmsDialog: false })}
        />
      </Wrapper>
    )
  }
}

const Wrapper = Div.extend``

import React, { Component } from 'react'
import { Div } from 'styled-kit'

import { Heading } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'

import logo from 'assets/logo.svg'

export default class Step1Page extends Component {
  state = {}

  render() {
    return (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <Heading center mTop={13}>
          Get your new mBank account in only 3 simple steps and start with...
        </Heading>

        <StepStatus>
          <Step number="1" isDone>Personal data</Step>
          <Step number="2" isActive>Video identification</Step>
          <Step number="3">PIN & password setup</Step>
        </StepStatus>

        <Button
          onClick={() => this.props.history.push('/404')}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )
  }
}

import React, { Component } from 'react'
import { Div } from 'styled-kit'

import Button from 'components/Button'
import { Heading, Paragraph, Link } from 'components/Typography'
import PhoneInput from 'components/PhoneInput'

import logo from 'assets/logo.svg'

export default class FirstLoginPage extends Component {
  state = { phoneNumber: '' }

  handleChange = name => event => this.setState({ [name]: event.target.value })

  validatePhoneNumber = value => value.length === 11 && value.indexOf('_') === -1

  render = () => (
    <Div flex={1} column itemsCenter padding="30px 16px">
      <img src={logo} alt="Logo" width="108" />

      <Heading center mTop={13}>
        Hi, Welcome!
      </Heading>

      <Paragraph center mTop={12}>
        To start please provide your mobile phone number
      </Paragraph>

      <PhoneInput value={this.state.phoneNumber} onChange={this.handleChange('phoneNumber')} />

      <Link center mTop="auto" onClick={() => this.props.history.push('/404')}>
        Already have an account
      </Link>

      <Button
        disabled={!this.validatePhoneNumber(this.state.phoneNumber)}
        onClick={() => this.props.history.push('/step-1')}
        style={{ marginTop: 26 }}
      >
        Next step
      </Button>
    </Div>
  )
}

import React, { Component } from 'react'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'

import Button from 'components/Button'
import { H1, H2, Link } from 'components/Typography'
import PhoneInput from 'components/PhoneInput'

import logo from 'assets/logo.svg'

class FirstLoginPage extends Component {
  state = { phoneNumber: '' }

  handleChange = name => event => this.setState({ [name]: event.target.value })

  validatePhoneNumber = value => value.length === 11 && value.indexOf('_') === -1

  render() {
    const { history, texts } = this.props
    const { phoneNumber } = this.state

    const t = texts.onboarding1.firstLogin

    return (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <H1 center mTop={13}>
          {t[0]}
        </H1>

        <H2 center mTop={12}>
          {t[1]}
        </H2>

        <PhoneInput value={phoneNumber} onChange={this.handleChange('phoneNumber')} />

        <Link center mTop="auto" onClick={() => history.push('/404')}>
          {t[2]}
        </Link>

        <Button
          disabled={!this.validatePhoneNumber(phoneNumber)}
          onClick={() => history.push('/onboarding-1/step-1')}
          style={{ marginTop: 26 }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )
  }
}

export default withTexts(FirstLoginPage)

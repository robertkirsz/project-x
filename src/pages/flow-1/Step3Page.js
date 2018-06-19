import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
// import Select from '@material-ui/core/Select'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'

import { H1, H2, Paragraph, Small } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import Progress from 'components/Progress'
import PinInput from 'components/PinInput'

import logo from 'assets/logo.svg'

const paths = [
  '/onboarding-1/step-3/pin-setup',
  '/onboarding-1/step-3/pin-confirm',
  '/onboarding-1/step-3/password-setup',
  '/onboarding-1/step-3/email-confirm'
]

const isPasswordValid = value => {
  // Minimum length
  if (value.length < 6) return false
  // Various case
  if (value.toLowerCase() === value) return false
  // Numbers
  if (!/\d/.test(value)) return false
  // Special characters
  if (!/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) return false

  return true
}

export default class Step3Page extends Component {
  state = {
    pin: '',
    pinConfirm: '',
    password: '',
    passwordConfirm: ''
  }

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => this.setState({ [name]: event.target.value })

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  isValid = keys => {
    for (let index in keys) return Boolean(this.state[keys[index]])
  }

  render() {
    const currentStep = paths.findIndex(path => path === this.props.location.pathname)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <H1 mTop={13}>
          Great {this.props.formData.firstName}! Continue with video identification and verify your account
        </H1>

        <StepStatus>
          <Step number="1" isDone>
            Personal data
          </Step>
          <Step number="2" isDone>
            Video identification
          </Step>
          <Step number="3" isActive>
            PIN & password setup
          </Step>
        </StepStatus>

        <Button onClick={() => this.props.history.push('/onboarding-1/step-3/pin-setup')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    const pinSetup = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Small center style={{ display: 'block', height: 28 }}>
          This PIN is used for all in-app authorisations on this device. We won’t use any other method for this.
        </Small>

        <PinInput value={this.state.pin} onChange={this.change('pin')}>
          Choose 5 - 8
        </PinInput>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-3/pin-confirm')}
          disabled={this.state.pin.length < 5}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const pinConfirm = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Small center style={{ display: 'block', height: 28 }}>
          Enter the same digits again
        </Small>

        <PinInput value={this.state.pinConfirm} onChange={this.change('pinConfirm')} />

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-3/password-setup')}
          disabled={this.state.pin !== this.state.pinConfirm}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const passwordSetup = (
      <Div flex={1} column padding="30px 16px">
        <H2>We need your contact information</H2>

        <Small mTop={8}>
          This password is required for the login to your account. For best password strenght use at least 6 characters,
          at least one uppercase, special character and numbers.
        </Small>

        <TextField
          label="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          style={{ marginTop: 24 }}
        />

        <TextField
          label="Confirm password"
          type="password"
          value={this.state.passwordConfirm}
          onChange={this.handleChange('passwordConfirm')}
          style={{ marginTop: 16 }}
        />

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-3/email-confirm')}
          disabled={!isPasswordValid(this.state.password) || this.state.password !== this.state.passwordConfirm}
          style={{ marginTop: 'auto' }}
        >
          Confirm
        </Button>
      </Div>
    )

    const emailConfirm = <Div flex={1} column itemsCenter padding="30px 16px" />

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            {this.props.location.pathname === '/onboarding-1/step-3/pin-setup' && 'Setup your PIN'}
            {this.props.location.pathname === '/onboarding-1/step-3/pin-confirm' && 'Confirm your PIN'}
            {this.props.location.pathname === '/onboarding-1/step-3/password-setup' && 'Password setup'}
            {this.props.location.pathname === '/onboarding-1/step-3/email-cnfirm' && 'Mail confirmation'}
          </Progress>
        )}

        <Route path="/onboarding-1/step-3" exact render={() => intro} />
        <Route path="/onboarding-1/step-3/pin-setup" render={() => pinSetup} />
        <Route path="/onboarding-1/step-3/pin-confirm" render={() => pinConfirm} />
        <Route path="/onboarding-1/step-3/password-setup" render={() => passwordSetup} />
        <Route path="/onboarding-1/step-3/email-confirm" render={() => emailConfirm} />
      </Fragment>
    )
  }
}

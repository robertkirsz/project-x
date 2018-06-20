import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import isPasswordValid from 'utils/isPasswordValid'
import { withTexts } from 'providers/TextProvider'

import TextField from '@material-ui/core/TextField'

import { H1, H2, Small } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import Progress from 'components/Progress'
import PinInput from 'components/PinInput'

import logo from 'assets/logo.svg'
import mail from 'assets/mail.svg'

const paths = [
  '/onboarding-1/step-3/pin-setup',
  '/onboarding-1/step-3/pin-confirm',
  '/onboarding-1/step-3/password-setup',
  '/onboarding-1/step-3/email-confirm'
]

class Step3Page extends Component {
  state = {
    pin: '',
    pinConfirm: '',
    password: '',
    passwordConfirm: ''
  }

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => this.setState({ [name]: event.target.value })

  render() {
    const { texts } = this.props

    const titles = texts.onboarding1.stepTitles
    const t = texts.onboarding1.step3

    const currentStep = paths.findIndex(path => path === this.props.location.pathname)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <H1 mTop={13}>
          {/* TODO: this.props.formData.firstName */}
          {t.intro[0]}
        </H1>

        <StepStatus>
          <Step number="1" isDone>
            {titles[0]}
          </Step>
          <Step number="2" isDone>
            {titles[1]}
          </Step>
          <Step number="3" isActive>
            {titles[2]}
          </Step>
        </StepStatus>

        <Button onClick={() => this.props.history.push('/onboarding-1/step-3/pin-setup')} style={{ marginTop: 'auto' }}>
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const pinSetup = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Small center style={{ display: 'block', height: 28 }}>
          {t.pinSetup[0]}
        </Small>

        <PinInput value={this.state.pin} onChange={this.change('pin')}>
          {t.pinSetup[1]}
        </PinInput>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-3/pin-confirm')}
          disabled={this.state.pin.length < 5}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const pinConfirm = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Small center style={{ display: 'block', height: 28 }}>
          {t.pinConfirm[0]}
        </Small>

        <PinInput value={this.state.pinConfirm} onChange={this.change('pinConfirm')} />

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-3/password-setup')}
          disabled={this.state.pin !== this.state.pinConfirm}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const passwordSetup = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.passwordSetup[0]}</H2>

        <Small mTop={8}>
          {t.passwordSetup[1]}
        </Small>

        <TextField
          label={texts.misc.password}
          type="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          style={{ marginTop: 24 }}
        />

        <TextField
          label={texts.misc.confirmPassword}
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
          {texts.misc.confirm}
        </Button>
      </Div>
    )

    const emailConfirm = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <H1 center maxWidth={250}>
          {t.emailConfirm[0]}
        </H1>

        <H2 center maxWidth={280} mTop={16}>
          {t.emailConfirm[1]}
        </H2>

        <img src={mail} alt="" style={{ marginTop: 26 }} />
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            {this.props.location.pathname === '/onboarding-1/step-3/pin-setup' && t.pinSetup.title}
            {this.props.location.pathname === '/onboarding-1/step-3/pin-confirm' && t.pinConfirm.title}
            {this.props.location.pathname === '/onboarding-1/step-3/password-setup' && t.passwordSetup.title}
            {this.props.location.pathname === '/onboarding-1/step-3/email-confirm' && t.emailConfirm.title}
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

export default withTexts(Step3Page)

import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'
import _random from 'lodash/random'

import isPhoneNumberValid from 'utils/isPhoneNumberValid'
import allValid from 'utils/allValid'
import { withTexts } from 'providers/TextProvider'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import green from '@material-ui/core/colors/green'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { H1, H2, Paragraph, Link } from 'components/Typography'
import Button from 'components/Button'
import PhoneInput from 'components/PhoneInput'
import SmsDialog from 'components/SmsDialog'
import PinInput2 from 'components/PinInput2'

import logo from 'assets/logo.svg'
import editNumber from 'assets/2/edit-phone-number.svg'
import consentLogo from 'assets/2/consent-logo.svg'

const PIN_LENGTH = 6

const styles = theme => ({
  colorSwitchBase: {
    '&$colorChecked': {
      color: green[500],
      '& + $colorBar': {
        backgroundColor: green[500]
      }
    }
  },
  colorBar: {},
  colorChecked: {}
})

class FirstLoginPage extends Component {
  timeout = null
  interval = null

  state = {
    phoneNumber: '',
    pin: '',
    generatedPin: '',
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
    consent5: false,
    showSmsDialog: false,
    resendTime: 10
  }

  componentDidMount() {
    if (this.props.location.pathname === '/onboarding-2/first-login/pin-number' && !this.state.generatedPin) {
      this.timeout = setTimeout(this.generatePin, 1000)
      this.interval = setInterval(this.resendInterval, 1000)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== '/onboarding-2/first-login/pin-number' &&
      this.props.location.pathname === '/onboarding-2/first-login/pin-number' &&
      !this.state.generatedPin
    ) {
      this.timeout = setTimeout(this.generatePin, 1000)
      this.interval = setInterval(this.resendInterval, 1000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => this.setState({ [name]: event.target.value })

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  generatePin = () => {
    const generatedPin = Array(PIN_LENGTH)
      .fill(null)
      .map(() => _random(0, 9))
      .join('')

    this.setState({ showSmsDialog: true, generatedPin })
  }

  resendPin = () => {
    this.setState({ showSmsDialog: false, resendTime: 10 })

    this.timeout = setTimeout(() => {
      this.interval = setInterval(this.resendInterval, 1000)
      this.generatePin()
    }, 1000)
  }

  resendInterval = () => {
    const resendTime = this.state.resendTime - 1

    if (resendTime === 0) clearInterval(this.interval)

    this.setState({ resendTime })
  }

  handleConsentModalOpen = consentId => event =>
    this.setState({ showConsentModal: true, showConsentModalId: consentId })

  handleConsentModalClose = () => this.setState({ showConsentModal: false })

  handleLocationModalOpen = callback => this.setState({ showLocationModal: true, locationModalCallback: callback })

  handleLocationModalClose = () => this.setState({ showLocationModal: false })

  handleLocationModalConfirm = () => {
    this.setState({ showLocationModal: false, allowLocation: true })
    if (this.state.locationModalCallback) this.state.locationModalCallback()
  }

  render() {
    const { texts, classes } = this.props

    const t = texts.onboarding1.step1

    const pinIsValid =
      this.state.pin !== '' && this.state.generatedPin !== '' && this.state.pin === this.state.generatedPin

    const phoneNumber = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="" width="108" />

        <H1 center mTop={14}>
          {texts.onboarding2.other[0]}
        </H1>

        <PhoneInput
          value={this.state.phoneNumber}
          onChange={this.handleChange('phoneNumber')}
          style={{ marginTop: 35 }}
        />

        <H2 center mTop={8}>
          {texts.onboarding1.firstLogin[1]}
        </H2>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/first-login/pin-number')}
          disabled={!isPhoneNumberValid(this.state.phoneNumber)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.continue}
        </Button>
      </Div>
    )

    const pinNumber = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="" width="108" />

        <H1 center mTop={13}>
          Enter the 6-digit code
        </H1>

        <PinInput2
          value={this.state.pin}
          length={PIN_LENGTH}
          isValid={pinIsValid}
          onChange={this.change('pin')}
          style={{ margin: '26px auto 30px' }}
        />

        <H2 center>
          We've send it to +49 {this.state.phoneNumber}{' '}
          <img
            src={editNumber}
            alt=""
            style={{ marginLeft: 8 }}
            onClick={() => this.props.history.push('/onboarding-2/first-login/phone-number')}
          />
        </H2>

        <Div
          column
          itemsCenter
          mTop="auto"
          style={{ transition: '0.3s', opacity: pinIsValid ? 0 : 1, pointerEvents: pinIsValid && 'none' }}
        >
          <Paragraph center maxWidth={170}>
            Wait for 0:{this.state.resendTime < 10 ? `0${this.state.resendTime}` : this.state.resendTime} and resend if
            the code didn't arrive
          </Paragraph>

          {this.state.resendTime === 0 && (
            <Link center mTop={8} onClick={this.resendPin}>
              Resend the code
            </Link>
          )}
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/first-login/consents-1')}
          disabled={!pinIsValid}
          style={{ marginTop: 25 }}
        >
          Confirm & Pair
        </Button>
      </Div>
    )

    const consents1 = (
      <Div flex={1} itemsCenter column padding="30px 16px">
        <img src={logo} alt="" />

        <img src={consentLogo} alt="" style={{ marginTop: 16 }} />

        <H1 center mTop={8}>
          Data processing consents
        </H1>

        <H2 center mTop={6}>
          They are necessary so we can provide you the best possible services in accordance with European law
        </H2>

        <Div column listTop={19} mTop={19}>
          <Div itemsCenter>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.consent1}
                  onChange={this.handleCheckboxChange('consent1')}
                  value="consent1"
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar
                  }}
                />
              }
              label="Terms of Service of mBank and IDNow"
            />

            <Link mLeft="auto" onClick={this.handleConsentModalOpen('consent1')}>
              Read
            </Link>
          </Div>

          <Div itemsCenter>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.consent2}
                  onChange={this.handleCheckboxChange('consent2')}
                  value="consent2"
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar
                  }}
                />
              }
              label="Data processing and usage"
            />

            <Link mLeft="auto" onClick={this.handleConsentModalOpen('consent1')}>
              Read
            </Link>
          </Div>

          <Div itemsCenter>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.consent3}
                  onChange={this.handleCheckboxChange('consent3')}
                  value="consent3"
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar
                  }}
                />
              }
              label="General Data Protection Regulation"
            />

            <Link mLeft="auto" onClick={this.handleConsentModalOpen('consent3')}>
              Read
            </Link>
          </Div>
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/first-login/consents-2')}
          disabled={!this.state.consent1 || !this.state.consent2 || !this.state.consent3}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const consents2 = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.name[0]}</H2>

        <Div column listTop={12} mTop={8}>
          <TextField label={t.name[1]} value={this.state.firstName} onChange={this.handleChange('firstName')} />
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-1/name')}
          disabled={!allValid(['firstName'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    return (
      <Fragment>
        <SmsDialog
          isVisible={this.state.showSmsDialog}
          pin={this.state.generatedPin}
          onClick={() => this.setState({ showSmsDialog: false })}
        />

        <Route path="/onboarding-2/first-login/phone-number" render={() => phoneNumber} />
        <Route path="/onboarding-2/first-login/pin-number" render={() => pinNumber} />
        <Route path="/onboarding-2/first-login/consents-1" render={() => consents1} />
        <Route path="/onboarding-2/first-login/consents-2" render={() => consents2} />
      </Fragment>
    )
  }
}

export default withStyles(styles)(withTexts(FirstLoginPage))

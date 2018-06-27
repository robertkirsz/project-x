import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'
import _random from 'lodash/random'

import isPhoneNumberValid from 'utils/isPhoneNumberValid'
import parseValues from 'utils/parseValues'
import { withTexts } from 'providers/TextProvider'

import { withStyles } from '@material-ui/core/styles'
import MuiSwitch from '@material-ui/core/Switch'
import green from '@material-ui/core/colors/green'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { H1, H2, Paragraph, Link } from 'components/Typography'
import Button from 'components/Button'
import PhoneInput from 'components/PhoneInput'
import SmsDialog from 'components/SmsDialog'
import PinInput2 from 'components/PinInput2'
import NativeModal from 'components/NativeModal'

import logo from 'assets/logo.svg'
import editNumber from 'assets/2/edit-phone-number.svg'
import consentLogo from 'assets/2/consent-logo.svg'
import consentLogo2 from 'assets/2/consent-logo-2.svg'
import arrow from 'assets/arrow-left.svg'

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
    resendTime: 30,
    showConsentModal: false,
    showConsentModalId: 'consent1',
    showLocationModal: false,
    allowLocation: false,
    locationModalCallback: null,
    show: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ show: true }), 300)

    if (this.props.location.pathname === '/onboarding-2/first-login/pin-number' && !this.state.generatedPin) {
      this.timeout = setTimeout(() => {
        this.timeout = setTimeout(this.generatePin, 1000)
        this.interval = setInterval(this.resendInterval, 1000)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.pathname !== '/onboarding-2/first-login/pin-number' &&
      this.props.location.pathname === '/onboarding-2/first-login/pin-number' &&
      !this.state.generatedPin
    ) {
      this.timeout = setTimeout(this.generatePin, 1000)
      this.interval = setInterval(this.resendInterval, 1000)
    }

    if (!prevState.consent2 && this.state.consent2 && !this.state.allowLocation) {
      this.handleLocationModalOpen()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => {
    if (name === 'phoneNumber') {
      sessionStorage.setItem('phoneNumber', event.target.value)
    }

    this.setState({ [name]: event.target.value })
  }

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  generatePin = () => {
    const generatedPin = Array(PIN_LENGTH)
      .fill(null)
      .map(() => _random(0, 9))
      .join('')

    this.setState({ showSmsDialog: true, generatedPin })
  }

  resendPin = () => {
    this.setState({ showSmsDialog: false, resendTime: 30 })

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

    const pinIsValid =
      this.state.pin !== '' && this.state.generatedPin !== '' && this.state.pin === this.state.generatedPin

    const phoneNumber = (
      <Div
        flex={1}
        column
        itemsCenter
        padding="30px 16px"
        style={{ transition: '0.3s', opacity: this.state.show ? 1 : 0 }}
      >
        <img src={logo} alt="" width="108" />

        <H1 center mTop={14}>
          {texts.onboarding2.other[0]}
        </H1>

        <PhoneInput
          value={this.state.phoneNumber}
          onChange={this.handleChange('phoneNumber')}
          style={{ marginTop: 35, flex: 'none' }}
        />

        <H2 center mTop={8} mBottom={16}>
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
          {texts.onboarding2.other[1]}
        </H1>

        <PinInput2
          value={this.state.pin}
          length={PIN_LENGTH}
          isValid={pinIsValid}
          onChange={this.change('pin')}
          style={{ margin: '26px auto 30px', flex: 'none' }}
        />

        <H2 center>
          {parseValues(texts.onboarding2.other[2], {
            phoneNumber: '+49 ' + (this.state.phoneNumber || sessionStorage.getItem('phoneNumber'))
          })}
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
          flex="none"
          style={{ transition: '0.3s', opacity: pinIsValid ? 0 : 1, pointerEvents: pinIsValid && 'none' }}
        >
          <Paragraph center maxWidth={280}>
            {parseValues(texts.onboarding2.other[3], {
              time: '0:' + (this.state.resendTime < 10 ? `0${this.state.resendTime}` : this.state.resendTime)
            })}
          </Paragraph>

          {this.state.resendTime === 0 && (
            <Link center mTop={8} onClick={this.resendPin}>
              {texts.onboarding2.other[4]}
            </Link>
          )}
        </Div>

        <Button
          onClick={() => {
            this.props.history.push('/onboarding-2/first-login/consents-1')
            this.setState({ showSmsDialog: false })
          }}
          disabled={!pinIsValid}
          style={{ marginTop: 25 }}
        >
          {texts.onboarding2.other[5]}
        </Button>
      </Div>
    )

    const consents1 = (
      <Div flex={1} itemsCenter column padding="30px 16px">
        <Arrow src={arrow} onClick={this.props.history.goBack} />

        <img src={logo} alt="" width="108" />

        <img src={consentLogo} alt="" style={{ marginTop: 16 }} height="84" />

        <H1 center mTop={8}>
          {texts.onboarding2.other[6]}
        </H1>

        <H2 center mTop={6}>
          {texts.onboarding2.other[7]}
        </H2>

        <Div flex="none" mBottom={16} column selfStretch mTop={19}>
          <Div itemsCenter>
            <FormControlLabel
              label={texts.onboarding1.step1.consents[3]}
              control={
                <MuiSwitch
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
            />

            <ConsentLink mLeft="auto" onClick={this.handleConsentModalOpen('consent1')}>
              {texts.misc.read}
            </ConsentLink>
          </Div>

          <Div itemsCenter>
            <FormControlLabel
              label={texts.onboarding1.step1.consents[5]}
              control={
                <MuiSwitch
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
            />

            <ConsentLink mLeft="auto" onClick={this.handleConsentModalOpen('consent2')}>
              {texts.misc.read}
            </ConsentLink>
          </Div>

          <Div itemsCenter>
            <FormControlLabel
              label={texts.onboarding1.step1.consents[6]}
              control={
                <MuiSwitch
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
            />

            <ConsentLink mLeft="auto" onClick={this.handleConsentModalOpen('consent3')}>
              {texts.misc.read}
            </ConsentLink>
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
      <Div flex={1} itemsCenter column padding="30px 16px">
        <Arrow src={arrow} onClick={this.props.history.goBack} />

        <img src={logo} alt="" width="108" />

        <img src={consentLogo2} alt="" style={{ marginTop: 16 }} height="84" />

        <H1 center mTop={8}>
          {texts.onboarding2.other[8]}
        </H1>

        <H2 center mTop={6}>
          {texts.onboarding2.other[9]}
        </H2>

        <Div flex="none" mBottom={16} column selfStretch mTop={19}>
          <Div itemsCenter>
            <FormControlLabel
              label={texts.onboarding1.step1.consents[2]}
              control={
                <MuiSwitch
                  checked={this.state.consent4}
                  onChange={this.handleCheckboxChange('consent4')}
                  value="consent4"
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar
                  }}
                />
              }
            />

            <ConsentLink mLeft="auto" onClick={this.handleConsentModalOpen('consent4')}>
              {texts.misc.read}
            </ConsentLink>
          </Div>

          <Div itemsCenter>
            <FormControlLabel
              label={texts.onboarding1.step1.consents[4]}
              control={
                <MuiSwitch
                  checked={this.state.consent5}
                  onChange={this.handleCheckboxChange('consent5')}
                  value="consent5"
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar
                  }}
                />
              }
            />

            <ConsentLink mLeft="auto" onClick={this.handleConsentModalOpen('consent5')}>
              {texts.misc.read}
            </ConsentLink>
          </Div>
        </Div>

        <Button onClick={() => this.props.history.push('/onboarding-2/step-1/name')} style={{ marginTop: 'auto' }}>
          {texts.misc.start}
        </Button>
      </Div>
    )

    const consentData = [
      { id: 'consent1', label: texts.onboarding1.step1.consents[3] },
      { id: 'consent2', label: texts.onboarding1.step1.consents[5] },
      { id: 'consent3', label: texts.onboarding1.step1.consents[6] },
      { id: 'consent4', label: texts.onboarding1.step1.consents[2] },
      { id: 'consent5', label: texts.onboarding1.step1.consents[4] }
    ]

    return (
      <Fragment>
        <Route path="/onboarding-2/first-login/phone-number" render={() => phoneNumber} />
        <Route path="/onboarding-2/first-login/pin-number" render={() => pinNumber} />
        <Route path="/onboarding-2/first-login/consents-1" render={() => consents1} />
        <Route path="/onboarding-2/first-login/consents-2" render={() => consents2} />

        <SmsDialog
          withDash
          isVisible={this.state.showSmsDialog}
          pin={this.state.generatedPin}
          onClick={() => this.setState({ showSmsDialog: false })}
        />

        <NativeModal
          type="location"
          open={this.state.showLocationModal}
          onClose={this.handleLocationModalClose}
          onConfirm={this.handleLocationModalConfirm}
        />

        <Dialog open={Boolean(this.state.showConsentModal)} onClose={this.handleConsentModalClose}>
          <DialogTitle>{consentData.find(item => item.id === this.state.showConsentModalId).label}</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <MuiButton onClick={this.handleConsentModalClose} color="primary">
              {texts.misc.okay}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default withStyles(styles)(withTexts(FirstLoginPage))

const ConsentLink = Link.extend`
  font-family: Roboto;
  text-decoration: none;
`

const Arrow = styled.img`
  position: absolute;
  left: 0;
  left: 8px;
  padding: 8px;
`

import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import MuiButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'

import { H1, H2, Paragraph } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button, { ButtonSpinner } from 'components/Button'
import Progress from 'components/Progress'

import logo from 'assets/logo.svg'
import camera from 'assets/camera.svg'
import video1 from 'assets/video-identification-1.svg'
import video2 from 'assets/video-identification-2.svg'
import video3 from 'assets/video-identification-3.svg'
import video4 from 'assets/video-identification-4.svg'

const paths = [
  '/onboarding-1/step-2/prepare-to-video',
  '/onboarding-1/step-2/connecting',
  '/onboarding-1/step-2/conversation',
  '/onboarding-1/step-2/sms-code',
  '/onboarding-1/step-2/waiting',
  '/onboarding-1/step-2/account-ready'
]

export default class Step2Page extends Component {
  timeout = null

  state = { showAllowCameraModal: false }

  componentDidMount() {
    if (this.props.location.pathname === '/onboarding-1/step-2/connecting') {
      this.timeout = setTimeout(this.handleAllowCameraModalShow, 2500)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== '/onboarding-1/step-2/connecting' &&
      this.props.location.pathname === '/onboarding-1/step-2/connecting'
    ) {
      this.timeout = setTimeout(this.handleAllowCameraModalShow, 2500)
    }
  }

  componentWillUnmount = () => clearTimeout(this.timeout)

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => this.setState({ [name]: event.target.value })

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  isValid = keys => {
    for (let index in keys) return Boolean(this.state[keys[index]])
  }

  handleAllowCameraModalShow = () => this.setState({ showAllowCameraModal: true })

  handleAllowCameraModalClose = () => this.setState({ showAllowCameraModal: false })

  handleAllowCameraModalConfirm = () => {
    this.handleAllowCameraModalClose()
    this.timeout = setTimeout(() => this.props.history.push('/onboarding-1/step-2/conversation'), 800)
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
          <Step number="2" isActive>
            Video identification
          </Step>
          <Step number="3">PIN & password setup</Step>
        </StepStatus>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-2/prepare-to-video')}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const prepareToVideo = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Div column selfStart listTop={40} mTop={24}>
          <Div listLeft={48} itemsCenter>
            <img src={video1} alt="" />
            <Paragraph>
              Prepare an<br />ID document
            </Paragraph>
          </Div>
          <Div listLeft={48} itemsCenter>
            <img src={video2} alt="" />
            <Paragraph>Look fo a quiet place</Paragraph>
          </Div>
          <Div listLeft={48} itemsCenter>
            <img src={video3} alt="" />
            <Paragraph>
              Keep your signal<br />strong
            </Paragraph>
          </Div>
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-2/connecting')}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const connecting = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <H1 center mTop={44}>
          Please wait a moment
        </H1>

        <H2 center mTop={24}>
          Establishing connection with<br />our consultant
        </H2>

        <img
          src={video4}
          alt=""
          style={{ marginTop: 66 }}
          onClick={() => this.setState({ showAllowCameraModal: true })}
        />

        <Button disabled style={{ marginTop: 'auto' }}>
          <ButtonSpinner />
        </Button>

        <Dialog open={this.state.showAllowCameraModal} onClose={this.handleAllowCameraModalClose}>
          <Div listLeft={35} itemsStart padding="36px 24px 0">
            <img src={camera} alt="" />
            <DialogText>Allow mBank Europe app to take pictures and record video?</DialogText>
          </Div>

          <DialogActions>
            <MuiButton onClick={this.handleAllowCameraModalClose}>Deny</MuiButton>
            <MuiButton onClick={this.handleAllowCameraModalConfirm} style={{ color: '#4DB6AC' }}>
              Allow
            </MuiButton>
          </DialogActions>
        </Dialog>
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            Video identification
          </Progress>
        )}

        <Route path="/onboarding-1/step-2" exact render={() => intro} />
        <Route path="/onboarding-1/step-2/prepare-to-video" render={() => prepareToVideo} />
        <Route path="/onboarding-1/step-2/connecting" render={() => connecting} />
      </Fragment>
    )
  }
}

const DialogText = styled.div`
  font-size: 16px;
  color: #666666;
  letter-spacing: 0;
  line-height: 20px;
`

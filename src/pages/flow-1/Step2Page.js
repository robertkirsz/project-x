import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import MuiButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'

import { withTexts } from 'providers/TextProvider'

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

class Step2Page extends Component {
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

    if (
      prevProps.location.pathname === '/onboarding-1/step-2/connecting' &&
      this.props.location.pathname !== '/onboarding-1/step-2/connecting'
    ) {
      clearTimeout(this.timeout)
    }
  }

  componentWillUnmount = () => clearTimeout(this.timeout)

  handleAllowCameraModalShow = () => this.setState({ showAllowCameraModal: true })

  handleAllowCameraModalClose = () => this.setState({ showAllowCameraModal: false })

  handleAllowCameraModalConfirm = () => {
    this.handleAllowCameraModalClose()
    this.timeout = setTimeout(() => this.props.history.push('/onboarding-1/step-2/conversation'), 800)
  }

  render() {
    const { texts } = this.props

    const titles = texts.onboarding1.stepTitles
    const t = texts.onboarding1.step2

    const currentStep = paths.findIndex(path => path === this.props.location.pathname)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="" width="108" />

        <H1 mTop={13}>
          {/* TODO: this.props.formData.firstName */}
          {t.intro[0]}
        </H1>

        <StepStatus>
          <Step number="1" isDone>
            {titles[0]}
          </Step>
          <Step number="2" isActive>
            {titles[1]}
          </Step>
          <Step number="3">{titles[2]}</Step>
        </StepStatus>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-2/prepare-to-video')}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const prepareToVideo = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Div column selfStart listTop={40} mTop={24}>
          <Div listLeft={48} itemsCenter>
            <img src={video1} alt="" />
            <Paragraph>{t.prepareToVideo[0]}</Paragraph>
          </Div>

          <Div listLeft={48} itemsCenter>
            <img src={video2} alt="" />
            <Paragraph>{t.prepareToVideo[1]}</Paragraph>
          </Div>

          <Div listLeft={48} itemsCenter>
            <img src={video3} alt="" />
            <Paragraph>{t.prepareToVideo[2]}</Paragraph>
          </Div>
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-2/connecting')}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const connecting = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <H1 center mTop={44}>
          {t.connecting[0]}
        </H1>

        <H2 center mTop={24} maxWidth={230}>
          {t.connecting[1]}
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
            <DialogText>{texts.misc.allowCamera}</DialogText>
          </Div>

          <DialogActions>
            <MuiButton onClick={this.handleAllowCameraModalClose}>{texts.misc.deny}</MuiButton>
            <MuiButton onClick={this.handleAllowCameraModalConfirm} style={{ color: '#4DB6AC' }}>
              {texts.misc.allow}
            </MuiButton>
          </DialogActions>
        </Dialog>
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            {t.prepareToVideo.title}
          </Progress>
        )}

        <Route path="/onboarding-1/step-2" exact render={() => intro} />
        <Route path="/onboarding-1/step-2/prepare-to-video" render={() => prepareToVideo} />
        <Route path="/onboarding-1/step-2/connecting" render={() => connecting} />
      </Fragment>
    )
  }
}

export default withTexts(Step2Page)

const DialogText = styled.div`
  font-size: 16px;
  color: #666666;
  letter-spacing: 0;
  line-height: 20px;
`

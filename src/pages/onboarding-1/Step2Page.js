import React, { Component, Fragment } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import { withTexts } from 'providers/TextProvider'
import parseValues from 'utils/parseValues'
import routes from 'routes'

import { H1, H2, Paragraph, Link } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button, { ButtonSpinner } from 'components/Button'
import Progress from 'components/Progress'
import NativeModal from 'components/NativeModal'
import ConversationDemo from 'components/ConversationDemo1'

import logo from 'assets/logo.svg'
import video1 from 'assets/video-identification-1.svg'
import video2 from 'assets/video-identification-2.svg'
import video3 from 'assets/video-identification-3.svg'
import video4 from 'assets/video-identification-4.svg'
import accountCreating from 'assets/account-creating.svg'
import accountReadyIcon from 'assets/account-ready.svg'

const paths = routes.filter(route => route.includes('/onboarding-1/step-2/'))

class Step2Page extends Component {
  timeout = null

  state = { showAllowCameraModal: false }

  componentDidMount() {
    if (this.props.location.pathname === '/onboarding-1/step-2/connecting') {
      this.timeout = setTimeout(this.handleAllowCameraModalShow, 2500)
    }

    if (this.props.location.pathname === '/onboarding-1/step-2/waiting') {
      this.timeout = setTimeout(() => this.props.history.push('/onboarding-1/step-2/account-ready'), 2500)
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

    if (
      prevProps.location.pathname !== '/onboarding-1/step-2/waiting' &&
      this.props.location.pathname === '/onboarding-1/step-2/waiting'
    ) {
      this.timeout = setTimeout(() => this.props.history.push('/onboarding-1/step-2/account-ready'), 2500)
    }

    if (
      prevProps.location.pathname === '/onboarding-1/step-2/waiting' &&
      this.props.location.pathname !== '/onboarding-1/step-2/waiting'
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

        <H1 mTop={13}>{parseValues(t.intro[0], { userName: sessionStorage.getItem('firstName') })}</H1>

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

        <NativeModal
          type="camera"
          open={this.state.showAllowCameraModal}
          onClose={this.handleAllowCameraModalClose}
          onConfirm={this.handleAllowCameraModalConfirm}
        />
      </Div>
    )

    const conversation = (
      <Div flex={1} column>
        <ConversationDemo texts={texts.onboarding1.step2.conversation} onFinish={() => this.props.history.push('/onboarding-1/step-2/sms-code')} />
      </Div>
    )

    const waiting = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <H1 mTop={16}>{t.waiting[0]}</H1>
        <img src={accountCreating} alt="" style={{ marginTop: 38 }} />
      </Div>
    )

    const accountReady = (
      <ThemeProvider theme={{ darkMode: true }}>
        <Div flex={1} column itemsCenter padding="30px 16px" background="#20A134">
          <H1 center mTop={80} maxWidth={280}>
            {t.accountReady[0]}
          </H1>

          <img src={accountReadyIcon} alt="" style={{ marginTop: 38 }} />

          <Div mTop={48} listLeft={24}>
            <Div column>
              <Label>{t.accountReady[2]}</Label>
              <Value>{t.accountReady[3]}</Value>
            </Div>

            <Div column>
              <Label>{t.accountReady[4]}</Label>
              <Value>{t.accountReady[5]}</Value>
            </Div>
          </Div>

          <Link mTop="auto">{t.accountReady[1]}</Link>

          <Button onClick={() => this.props.history.push('/onboarding-1/step-3')} style={{ marginTop: 24 }}>
            {texts.misc.nextStep}
          </Button>
        </Div>
      </ThemeProvider>
    )

    return (
      <Fragment>
        {!this.props.match.isExact &&
          this.props.location.pathname !== '/onboarding-1/step-2/account-ready' && (
            <Progress currentStep={currentStep} paths={paths}>
              {t.prepareToVideo.title}
            </Progress>
          )}

        <Route path="/onboarding-1/step-2" exact render={() => intro} />
        <Route path="/onboarding-1/step-2/prepare-to-video" render={() => prepareToVideo} />
        <Route path="/onboarding-1/step-2/connecting" render={() => connecting} />
        <Route path="/onboarding-1/step-2/conversation" render={() => conversation} />
        <Route path="/onboarding-1/step-2/waiting" render={() => waiting} />
        <Route path="/onboarding-1/step-2/account-ready" render={() => accountReady} />
      </Fragment>
    )
  }
}

export default withTexts(Step2Page)

const Label = styled.span`
  font-size: 12px;
  color: white;
  letter-spacing: 0;
`

const Value = styled.span`
  font-size: 16px;
  color: white;
  letter-spacing: 0;
  line-height: 26px;
`

import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import parseValues from 'utils/parseValues'
import { withTexts } from 'providers/TextProvider'

import TextField from '@material-ui/core/TextField'

import PhoneInput from 'components/PhoneInput'
import { H1, H2, Paragraph, Link } from 'components/Typography'
import Button, { ButtonSpinner } from 'components/Button'
import NativeModal from 'components/NativeModal'
import ConversationDemo from 'components/ConversationDemo1'

import video1 from 'assets/video-identification-1.svg'
import video2 from 'assets/video-identification-2.svg'
import video3 from 'assets/video-identification-3.svg'
import video4 from 'assets/video-identification-4.svg'

class Step1Page extends Component {
  timeout = null

  state = { showAllowCameraModal: false }

  componentDidMount() {
    if (this.props.location.pathname === '/onboarding-2/step-2/connecting') {
      this.timeout = setTimeout(this.handleAllowCameraModalShow, 2500)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== '/onboarding-2/step-2/connecting' &&
      this.props.location.pathname === '/onboarding-2/step-2/connecting'
    ) {
      this.timeout = setTimeout(this.handleAllowCameraModalShow, 2500)
    }

    if (
      prevProps.location.pathname === '/onboarding-2/step-2/connecting' &&
      this.props.location.pathname !== '/onboarding-2/step-2/connecting'
    ) {
      clearTimeout(this.timeout)
    }
  }

  componentWillUnmount = () => clearTimeout(this.timeout)

  handleAllowCameraModalShow = () => this.setState({ showAllowCameraModal: true })

  handleAllowCameraModalClose = () => this.setState({ showAllowCameraModal: false })

  handleAllowCameraModalConfirm = () => {
    this.handleAllowCameraModalClose()
    this.timeout = setTimeout(() => this.props.history.push('/onboarding-2/step-2/conversation'), 800)
  }

  render() {
    const { texts } = this.props

    const t = texts.onboarding1.step2

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
          onClick={() => this.props.history.push('/onboarding-2/step-2/connecting')}
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
        <ConversationDemo
          texts={texts.onboarding1.step2.conversation}
          onFinish={() => this.props.history.push('/onboarding-2/step-3')}
        />
      </Div>
    )

    return (
      <Fragment>
        <Route path="/onboarding-2/step-2/prepare" render={() => prepareToVideo} />
        <Route path="/onboarding-2/step-2/connecting" render={() => connecting} />
        <Route path="/onboarding-2/step-2/conversation" render={() => conversation} />
      </Fragment>
    )
  }
}

export default withTexts(Step1Page)

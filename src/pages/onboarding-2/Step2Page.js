import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import parseValues from 'utils/parseValues'
import { withTexts } from 'providers/TextProvider'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { H1, H2, Paragraph } from 'components/Typography'
import Button, { ButtonSpinner } from 'components/Button'
import NativeModal from 'components/NativeModal'
import ConversationDemo2 from 'components/ConversationDemo2'

import video2 from 'assets/video-identification-2.svg'
import video4 from 'assets/video-identification-4.svg'
import video5 from 'assets/video-identification-5.svg'
import flag from 'assets/germany.svg'

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

    const prepareToVideo = (
      <Div flex={1} width="100vw" column itemsCenter padding="130px 16px 30px">
        <H1 center>{parseValues(texts.onboarding2.other[15], { userName: sessionStorage.getItem('firstName') })}</H1>

        <H2 center>{texts.onboarding2.other[16]}</H2>

        <FormControl style={{ width: '100%', marginTop: 6, flex: 'none' }}>
          <InputLabel htmlFor="country">{texts.misc.country}</InputLabel>
          <Select value="Deutschland - Personalausweis">
            <MenuItem value="Deutschland - Personalausweis">
              <img src={flag} width="20" alt="" style={{ marginRight: 6 }} /> Deutschland - Personalausweis
            </MenuItem>
          </Select>
        </FormControl>

        <Div flex="none" mBottom={16} selfStretch justifyAround mTop={50}>
          <Div column listTop={16} itemsCenter width={130}>
            <img src={video2} alt="" width="80" height="80" />
            <Paragraph center>{texts.onboarding1.step2.prepareToVideo[1]}</Paragraph>
          </Div>

          <Div column listTop={16} itemsCenter width={130}>
            <img src={video5} alt="" width="80" height="80" />
            <Paragraph center>{texts.onboarding1.step2.prepareToVideo[2]}</Paragraph>
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
      <Div flex={1} width="100vw" column itemsCenter padding="130px 16px 30px">
        <H1 center mTop={32}>
          {texts.onboarding1.step2.connecting[0]}
        </H1>

        <H2 center mTop={24} maxWidth={230}>
          {texts.onboarding1.step2.connecting[1]}
        </H2>

        <img
          src={video4}
          alt=""
          style={{ marginTop: 48 }}
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
      <Div flex={1} width="100vw" column>
        <ConversationDemo2
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

import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

// import TextField from '@material-ui/core/TextField'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import FormControl from '@material-ui/core/FormControl'
// import Select from '@material-ui/core/Select'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'

import { H1 } from 'components/Typography'
// import { H1, H2, Paragraph, Small, Link } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import Progress from 'components/Progress'

import logo from 'assets/logo.svg'

const paths = [
  '/onboarding-1/step-2/prepare-to-video',
  '/onboarding-1/step-2/connecting',
  '/onboarding-1/step-2/conversation',
  '/onboarding-1/step-2/sms-code',
  '/onboarding-1/step-2/waiting',
  '/onboarding-1/step-2/account-ready'
]

export default class Step2Page extends Component {
  state = {}

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
          <Step number="2" isActive>
            Video identification
          </Step>
          <Step number="3">PIN & password setup</Step>
        </StepStatus>

        <Button onClick={() => this.props.history.push('/onboarding-1/step-3')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            Lorem ipsum
          </Progress>
        )}

        <Route path="/onboarding-1/step-2" exact render={() => intro} />
      </Fragment>
    )
  }
}
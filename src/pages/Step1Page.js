import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'

import { Heading, Paragraph } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import CardCarousel from 'components/CardCarousel'

import logo from 'assets/logo.svg'

export default class Step1Page extends Component {
  state = {
    firstName: '',
    lastName: '',
    maidenName: '',
    chosenCard: 0
  }

  handleChange = name => event => this.setState({ [name]: event.target.value })
  change = name => value => this.setState({ [name]: value })

  isValid = keys => {
    for (let index in keys) if (this.state[keys[index]] === '') return false
    return true
  }

  render() {
    console.log(this.state)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <Heading center mTop={13}>
          Get your new mBank account in only 3 simple steps and start with...
        </Heading>

        <StepStatus>
          <Step number="1" isActive>
            Personal data
          </Step>
          <Step number="2">Video identification</Step>
          <Step number="3">PIN & password setup</Step>
        </StepStatus>

        <Button onClick={() => this.props.history.push('/step-1/name')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    const name = (
      <Div flex={1} column padding="30px 16px">
        <Paragraph center>Please tell us something about yourself</Paragraph>

        <Div column listTop={12} mTop={8}>
          <TextField label="First name" value={this.state.firstName} onChange={this.handleChange('firstName')} />

          <TextField label="Last name" value={this.state.lastName} onChange={this.handleChange('lastName')} />

          <TextField
            label="Maiden name (if has)"
            value={this.state.maidenName}
            onChange={this.handleChange('maidenName')}
          />
        </Div>

        <Button
          onClick={() => this.props.history.push('/step-1/card')}
          disabled={!this.isValid(['firstName', 'lastName'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const card = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <Paragraph center>Great, {this.state.firstName}! Select your card design</Paragraph>

        <CardCarousel value={this.state.chosenCard} onChange={this.change('chosenCard')} />

        <Button onClick={() => this.props.history.push('/step-1/card')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && <Div mBottom={24}>Progress</Div>}

        <Route path="/step-1" exact render={() => intro} />
        <Route path="/step-1/name" exact render={() => name} />
        <Route path="/step-1/card" exact render={() => card} />
      </Fragment>
    )
  }
}

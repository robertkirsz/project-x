import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'
import MaskedInput from 'react-text-mask'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import { Heading, Paragraph, Small } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import CardCarousel from 'components/CardCarousel'

import logo from 'assets/logo.svg'

const TextMaskCustom = props => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput {...other} ref={inputRef} mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]} />
  )
}

export default class Step1Page extends Component {
  state = {
    firstName: '',
    lastName: '',
    maidenName: '',
    chosenCard: 0,
    email: '',
    phoneNumber: '',
    birthDate: '',
    birthPlace: '',
    citizenship: '',
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

        <Heading mTop={13}>
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
        <Paragraph>Please tell us something about yourself</Paragraph>

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
        <Paragraph>Great, {this.state.firstName}! Select your card design</Paragraph>

        <CardCarousel value={this.state.chosenCard} onChange={this.change('chosenCard')} />

        <Button onClick={() => this.props.history.push('/step-1/contact')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    const contact = (
      <Div flex={1} column padding="30px 16px">
        <Paragraph>We need your contact information</Paragraph>

        <Small mTop={8}>
          We will use this phone number and email for login
        </Small>

        <Div column listTop={12} mTop={8}>
          <Div itemsCenter listLeft={16} selfStretch mTop={12}>
            <TextField select label="Country" value="+49" style={{ pointerEvents: 'none' }}>
              <MenuItem value="+49">+49</MenuItem>
            </TextField>

            <FormControl style={{ flex: 1 }}>
              <InputLabel htmlFor="phone-number-input">Phone number</InputLabel>

              <Input
                id="phone-number-input"
                value={this.state.phoneNumber}
                onChange={this.handleChange('phoneNumber')}
                type="tel"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
          </Div>

          <TextField
            label="Email address"
            type="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </Div>

        <Button
          onClick={() => this.props.history.push('/step-1/birth')}
          disabled={!this.isValid(['email', 'phoneNumber'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const birth = (
      <Div flex={1} column padding="30px 16px">
        <Paragraph>Please enter your...</Paragraph>

        <Div column listTop={12} mTop={8}>
          <TextField label="Birth date" value={this.state.birthDate} onChange={this.handleChange('birthDate')} />

          <TextField label="Birth place" value={this.state.birthPlace} onChange={this.handleChange('birthPlace')} />

          <TextField
            label="Citizenship"
            value={this.state.citizenship}
            onChange={this.handleChange('citizenship')}
          />
        </Div>

        <Button
          onClick={() => this.props.history.push('/step-1/card')}
          disabled={!this.isValid(['birthDate', 'birthPlace', 'citizenship'])}
          style={{ marginTop: 'auto' }}
        >
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
        <Route path="/step-1/contact" exact render={() => contact} />
        <Route path="/step-1/birth" exact render={() => birth} />
      </Fragment>
    )
  }
}

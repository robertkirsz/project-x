import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'

import { Heading, Paragraph, Small } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import CardCarousel from 'components/CardCarousel'
import Progress from 'components/Progress'
import PhoneInput from 'components/PhoneInput'

import logo from 'assets/logo.svg'

const paths = [
  '/step-1/name',
  '/step-1/card',
  '/step-1/contact',
  '/step-1/birth',
  '/step-1/residential-address',
  '/step-1/correspondence-address',
  '/step-1/tax-information',
  '/step-1/occupational-status',
  '/step-1/industry',
  '/step-1/review',
  '/step-1/consents',
  '/step-1/finish'
]

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
    postalCode: '',
    city: '',
    streetName: '',
    streetNumber: '',
    apartmentNumber: '',
    country: 'Germany',
    isCorrespondenceAddressDifferent: false,
    correspondencePostalCode: '',
    correspondenceCity: '',
    correspondenceStreetName: '',
    correspondenceStreetNumber: '',
    correspondenceApartmentNumber: '',
    correspondenceCountry: 'Germany',
    countryOfTax: '',
    taxId: '',
    job: '',
    industry: '',
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
    consent5: false,
    consent6: false
  }

  handleChange = name => event => this.setState({ [name]: event.target.value })

  change = name => value => this.setState({ [name]: value })

  isValid = keys => {
    for (let index in keys) if (this.state[keys[index]] === '') return false
    return true
  }

  render() {
    const currentStep = paths.findIndex(path => path === this.props.location.pathname)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <Heading mTop={13}>Get your new mBank account in only 3 simple steps and start with...</Heading>

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

        <Small mTop={8}>We will use this phone number and email for login</Small>

        <Div column listTop={12} mTop={8}>
          <PhoneInput value={this.state.phoneNumber} onChange={this.handleChange('phoneNumber')} />

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

          <TextField label="Citizenship" value={this.state.citizenship} onChange={this.handleChange('citizenship')} />
        </Div>

        <Button
          onClick={() => this.props.history.push('/step-1/residential-address')}
          disabled={!this.isValid(['birthDate', 'birthPlace', 'citizenship'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const residentialAddress = (
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
          onClick={() => this.props.history.push('/step-1/foo')}
          disabled={!this.isValid(['firstName', 'lastName'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const correspondenceAddress = residentialAddress
    const taxInformation = residentialAddress
    const occupationalStatus = residentialAddress
    const industry = residentialAddress
    const review = residentialAddress
    const consents = residentialAddress
    const finish = residentialAddress

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} allSteps={paths.length}>
            Progress
          </Progress>
        )}

        <Route path="/step-1" exact render={() => intro} />
        <Route path="/step-1/name" render={() => name} />
        <Route path="/step-1/card" render={() => card} />
        <Route path="/step-1/contact" render={() => contact} />
        <Route path="/step-1/birth" render={() => birth} />
        <Route path="/step-1/residential-address" render={() => residentialAddress} />
        <Route path="/step-1/correspondence-address" render={() => correspondenceAddress} />
        <Route path="/step-1/tax-information" render={() => taxInformation} />
        <Route path="/step-1/occupational-status" render={() => occupationalStatus} />
        <Route path="/step-1/industry" render={() => industry} />
        <Route path="/step-1/review" render={() => review} />
        <Route path="/step-1/consents" render={() => consents} />
        <Route path="/step-1/finish" render={() => finish} />
      </Fragment>
    )
  }
}

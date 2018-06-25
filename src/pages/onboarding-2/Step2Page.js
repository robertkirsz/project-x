import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import uuid from 'utils/uuid'
import parseValues from 'utils/parseValues'
import allValid from 'utils/allValid'
import { withTexts } from 'providers/TextProvider'

import TextField from '@material-ui/core/TextField'

import { H2, Small } from 'components/Typography'
import Button from 'components/Button'
import CardCarousel from 'components/CardCarousel'
import PhoneInput from 'components/PhoneInput'

const prefilledData = {
  firstName: 'John',
  lastName: 'Rambo',
  maidenName: 'Robert',
  chosenCard: 1,
  email: 'john.rambo@fake.mail',
  phoneNumber: '123 456 789',
  birthDate: '10-10-1970',
  birthPlace: 'Houston',
  citizenship: 'American',
  postalCode: '02-345',
  city: 'Houston',
  streetName: 'Some Street',
  buildingNumber: '1',
  apartmentNumber: '23',
  country: 'Germany',
  isCorrespondenceAddressDifferent: true,
  correspondencePostalCode: '03-489',
  correspondenceCity: 'Somewhere',
  correspondenceStreetName: 'Something',
  correspondenceBuildingNumber: '9',
  correspondenceApartmentNumber: '',
  correspondenceCountry: 'Germany',
  taxes: [
    {
      id: uuid(),
      countryOfTax: 'Foo',
      taxId: '123'
    }
  ],
  job: '',
  industry: '',
  consent1: true,
  consent2: true,
  consent3: true,
  consent4: true,
  consent5: false,
  consent6: false,
  reviewEditMode: false
}

class Step1Page extends Component {
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
    buildingNumber: '',
    apartmentNumber: '',
    country: 'Germany',
    isCorrespondenceAddressDifferent: false,
    correspondencePostalCode: '',
    correspondenceCity: '',
    correspondenceStreetName: '',
    correspondenceBuildingNumber: '',
    correspondenceApartmentNumber: '',
    correspondenceCountry: 'Germany',
    taxes: [
      {
        id: uuid(),
        countryOfTax: '',
        taxId: ''
      }
    ],
    job: '',
    industry: '',
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
    consent5: false,
    consent6: false,
    reviewEditMode: false,
    showConsentModal: false,
    showConsentModalId: 'consent1',
    showLocationModal: false,
    allowLocation: false,
    locationModalCallback: null
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.shouldPrefillData && this.props.shouldPrefillData) {
      this.setState(prefilledData)
    }
  }

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => {
    if (name === 'firstName') {
      sessionStorage.setItem('firstName', event.target.value)
    }

    if (name === 'lastName') {
      sessionStorage.setItem('lastName', event.target.value)
    }

    if (name === 'phoneNumber') {
      sessionStorage.setItem('phoneNumber', event.target.value)
    }

    this.setState({ [name]: event.target.value })
  }

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  prefillResidentialAddress = () => {
    const data = {
      postalCode: '23-946',
      city: 'Hamburg',
      streetName: 'Parkstr',
      buildingNumber: '25',
      apartmentNumber: '23',
      country: 'Germany'
    }

    if (this.state.allowLocation) this.setState(data)
    else this.handleLocationModalOpen(() => this.setState(data))
  }

  prefillCorrespondenceAddress = () => {
    const data = {
      correspondencePostalCode: '10-329',
      correspondenceCity: 'Berlin',
      correspondenceStreetName: 'Sommerallee',
      correspondenceBuildingNumber: '23',
      correspondenceApartmentNumber: '12',
      correspondenceCountry: 'Germany'
    }

    if (this.state.allowLocation) this.setState(data)
    else this.handleLocationModalOpen(() => this.setState(data))
  }

  addTax = () => {
    this.setState(state => ({
      ...state,
      taxes: [
        ...state.taxes,
        {
          id: uuid(),
          countryOfTax: '',
          taxId: ''
        }
      ]
    }))
  }

  handleTaxChange = (id, name) => event => {
    const value = event.target.value

    this.setState(state => ({
      ...state,
      taxes: state.taxes.map(tax => (tax.id === id ? { ...tax, [name]: value } : tax))
    }))
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
    const { texts } = this.props

    const t = texts.onboarding1.step1

    const name = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>{t.name[0]}</H2>

        <Div column listTop={12} mTop={8}>
          <TextField label={t.name[1]} value={this.state.firstName} onChange={this.handleChange('firstName')} />

          <TextField label={t.name[2]} value={this.state.lastName} onChange={this.handleChange('lastName')} />

          <TextField label={t.name[3]} value={this.state.maidenName} onChange={this.handleChange('maidenName')} />
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-2/card')}
          disabled={!allValid(['firstName', 'lastName'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const card = (
      <Div flex={1} column itemsCenter padding="150px 16px 30px">
        <H2>{parseValues(t.card[0], { userName: this.state.firstName })}</H2>

        <CardCarousel value={this.state.chosenCard} onChange={this.change('chosenCard')} />

        <Button onClick={() => this.props.history.push('/onboarding-2/step-2/contact')} style={{ marginTop: 'auto' }}>
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const contact = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>{t.contact[0]}</H2>

        <Small mTop={8}>{t.contact[1]}</Small>

        <Div column listTop={12} mTop={8}>
          <PhoneInput value={this.state.phoneNumber} onChange={this.handleChange('phoneNumber')} />

          <TextField
            label={texts.misc.emailAddress}
            type="email"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-3/name')}
          disabled={!allValid(['email', 'phoneNumber'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    return (
      <Fragment>
        <Route path="/onboarding-2/step-2/name" render={() => name} />
        <Route path="/onboarding-2/step-2/card" render={() => card} />
        <Route path="/onboarding-2/step-2/contact" render={() => contact} />
      </Fragment>
    )
  }
}

export default withTexts(Step1Page)

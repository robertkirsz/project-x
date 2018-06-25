import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import uuid from 'utils/uuid'
import parseValues from 'utils/parseValues'
import allValid from 'utils/allValid'
import { withTexts } from 'providers/TextProvider'
import routes from 'routes'

import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import MuiButton from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { H1, H2, Paragraph, Small, Link } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import CardCarousel from 'components/CardCarousel'
import Progress from 'components/Progress'
import PhoneInput from 'components/PhoneInput'
import NativeModal from 'components/NativeModal'

import logo from 'assets/logo.svg'
import mapMarker from 'assets/map-marker.svg'
import pdfIcon from 'assets/pdf-icon.svg'
import contractPdf from 'assets/Contract.pdf'

const paths = routes.filter(route => route.includes('/onboarding-1/step-1/'))

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

    const titles = texts.onboarding1.stepTitles
    const t = texts.onboarding1.step1

    const residentialAddressForm = (
      <Div flex="none" column listTop={12} mTop={8}>
        <Div listLeft={16}>
          <TextField
            label={texts.misc.postalCode}
            value={this.state.postalCode}
            onChange={this.handleChange('postalCode')}
            style={{ flex: 1 }}
          />
          <TextField
            label={texts.misc.city}
            value={this.state.city}
            onChange={this.handleChange('city')}
            style={{ flex: 1 }}
          />
        </Div>

        <TextField
          label={texts.misc.streetName}
          value={this.state.streetName}
          onChange={this.handleChange('streetName')}
        />

        <Div listLeft={16}>
          <TextField
            label={texts.misc.buildingNumber}
            type="number"
            value={this.state.buildingNumber}
            onChange={this.handleChange('buildingNumber')}
            style={{ flex: 1 }}
          />
          <TextField
            label={texts.misc.apartmentNumber}
            type="number"
            value={this.state.apartmentNumber}
            onChange={this.handleChange('apartmentNumber')}
            style={{ flex: 1 }}
          />
        </Div>

        <FormControl style={{ width: 'calc(50% - 8px)' }}>
          <InputLabel htmlFor="country">{texts.misc.country}</InputLabel>
          <Select
            value={this.state.country}
            onChange={this.handleChange('country')}
            inputProps={{ name: 'country', id: 'country' }}
          >
            <MenuItem value="Germany">{texts.misc.germany}</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          label={t.residentialAddress[3]}
          control={
            <Checkbox
              checked={this.state.isCorrespondenceAddressDifferent}
              onChange={this.handleCheckboxChange('isCorrespondenceAddressDifferent')}
              value="isCorrespondenceAddressDifferent"
              color="primary"
            />
          }
        />
      </Div>
    )

    const correspondenceAddressForm = (
      <Div flex="none" column listTop={12} mTop={8}>
        <Div listLeft={16}>
          <TextField
            label={texts.misc.postalCode}
            value={this.state.correspondencePostalCode}
            onChange={this.handleChange('correspondencePostalCode')}
            style={{ flex: 1 }}
          />
          <TextField
            label={texts.misc.city}
            value={this.state.correspondenceCity}
            onChange={this.handleChange('correspondenceCity')}
            style={{ flex: 1 }}
          />
        </Div>

        <TextField
          label={texts.misc.streetName}
          value={this.state.correspondenceStreetName}
          onChange={this.handleChange('correspondenceStreetName')}
        />

        <Div listLeft={16}>
          <TextField
            label={texts.misc.buildingNumber}
            type="number"
            value={this.state.correspondenceBuildingNumber}
            onChange={this.handleChange('correspondenceBuildingNumber')}
            style={{ flex: 1 }}
          />
          <TextField
            label={texts.misc.apartmentNumber}
            type="number"
            value={this.state.correspondenceApartmentNumber}
            onChange={this.handleChange('correspondenceApartmentNumber')}
            style={{ flex: 1 }}
          />
        </Div>

        <FormControl style={{ width: 'calc(50% - 8px)' }}>
          <InputLabel htmlFor="correspondenceCountry">{texts.misc.country}</InputLabel>
          <Select
            value={this.state.correspondenceCountry}
            onChange={this.handleChange('correspondenceCountry')}
            inputProps={{ name: 'correspondenceCountry', id: 'correspondenceCountry' }}
          >
            <MenuItem value="Germany">{texts.misc.germany}</MenuItem>
          </Select>
        </FormControl>
      </Div>
    )

    const currentStep = paths.findIndex(path => path === this.props.location.pathname)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="" width="108" />

        <H1 mTop={13}>{t.intro[0]}</H1>

        <StepStatus>
          <Step number="1" isActive>
            {titles[0]}
          </Step>
          <Step number="2">{titles[1]}</Step>
          <Step number="3">{titles[2]}</Step>
        </StepStatus>

        <Button onClick={() => this.props.history.push('/onboarding-1/step-1/name')} style={{ marginTop: 'auto' }}>
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const name = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.name[0]}</H2>

        <Div column listTop={12} mTop={8}>
          <TextField label={t.name[1]} value={this.state.firstName} onChange={this.handleChange('firstName')} />

          <TextField label={t.name[2]} value={this.state.lastName} onChange={this.handleChange('lastName')} />

          <TextField label={t.name[3]} value={this.state.maidenName} onChange={this.handleChange('maidenName')} />
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/card')}
          disabled={!allValid(['firstName', 'lastName'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const card = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <H2>{parseValues(t.card[0], { userName: this.state.firstName })}</H2>

        <CardCarousel value={this.state.chosenCard} onChange={this.change('chosenCard')} />

        <Button onClick={() => this.props.history.push('/onboarding-1/step-1/contact')} style={{ marginTop: 'auto' }}>
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const contact = (
      <Div flex={1} column padding="30px 16px">
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
          onClick={() => this.props.history.push('/onboarding-1/step-1/birth')}
          disabled={!allValid(['email', 'phoneNumber'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const birth = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.birth[0]}</H2>

        <Div column listTop={12} mTop={8}>
          <TextField
            type="date"
            label={texts.misc.birthDate}
            value={this.state.birthDate}
            onChange={this.handleChange('birthDate')}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label={texts.misc.birthPlace}
            value={this.state.birthPlace}
            onChange={this.handleChange('birthPlace')}
          />

          <TextField
            label={texts.misc.citizenship}
            value={this.state.citizenship}
            onChange={this.handleChange('citizenship')}
          />
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/residential-address')}
          disabled={!allValid(['birthDate', 'birthPlace', 'citizenship'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const residentialAddress = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.residentialAddress[0]}</H2>

        <Small mTop={8}>{t.residentialAddress[1]}</Small>

        <Link mTop={12} onClick={this.prefillResidentialAddress}>
          <img src={mapMarker} alt="" style={{ marginRight: 8 }} />
          {t.residentialAddress[2]}
        </Link>

        {residentialAddressForm}

        <Button
          onClick={() =>
            this.props.history.push(
              this.state.isCorrespondenceAddressDifferent
                ? '/onboarding-1/step-1/correspondence-address'
                : '/onboarding-1/step-1/tax-information'
            )
          }
          disabled={!allValid(['postalCode', 'city', 'streetName', 'buildingNumber', 'country'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const correspondenceAddress = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.correspondenceAddress[0]}</H2>

        <Link mTop={12} onClick={this.prefillCorrespondenceAddress}>
          <img src={mapMarker} alt="" style={{ marginRight: 8 }} />
          {t.residentialAddress[2]}
        </Link>

        {correspondenceAddressForm}

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/tax-information')}
          disabled={
            !allValid(
              [
                'correspondencePostalCode',
                'correspondenceCity',
                'correspondenceStreetName',
                'correspondenceBuildingNumber',
                'correspondenceCountry'
              ],
              this.state
            )
          }
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const taxInformation = (
      <Div flex={1} column padding="30px 16px">
        <Div flex="none" column>
          <H2>{t.taxInformation[0]}</H2>

          <Small mTop={8}>{t.taxInformation[1]}</Small>
        </Div>

        <Div flex={1} column listTop={24} style={{ overflow: 'auto' }}>
          {this.state.taxes.map(tax => (
            <Div flex="none" key={tax.id} column listTop={12} mTop={24}>
              <TextField
                label={t.taxInformation[2]}
                value={this.state.countryOfTax}
                onChange={this.handleTaxChange(tax.id, 'countryOfTax')}
                placeholder={t.taxInformation[5]}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label={t.taxInformation[3]}
                value={this.state.taxId}
                onChange={this.handleTaxChange(tax.id, 'taxId')}
                placeholder={t.taxInformation[5]}
                InputLabelProps={{ shrink: true }}
              />
            </Div>
          ))}

          <Link center style={{ alignSelf: 'center', margin: '24px 0' }} onClick={this.addTax}>
            {t.taxInformation[4]}
          </Link>
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/occupational-status')}
          style={{ flex: 'none', marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const occupationalStatus = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.occupationalStatus[0]}</H2>

        <Small mTop={8}>{t.occupationalStatus[1]}</Small>

        <Div column mTop={32}>
          <FormControl>
            <InputLabel htmlFor="jobSelect">{t.occupationalStatus[2]}</InputLabel>
            <Select
              value={this.state.job}
              onChange={this.handleChange('job')}
              inputProps={{ name: 'job', id: 'jobSelect' }}
            >
              {t.occupationalStatus.roles.map(role => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/industry')}
          disabled={!allValid(['job'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const industry = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.industry[0]}</H2>

        <Small mTop={8}>{t.industry[1]}</Small>

        <Div column mTop={24} pLeft={24}>
          <FormControl component="fieldset" required>
            <RadioGroup name="industry" value={this.state.industry} onChange={this.handleChange('industry')}>
              {t.industry.industries.map(industry => (
                <FormControlLabel
                  key={industry}
                  value={industry}
                  control={<Radio color="primary" />}
                  label={industry}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Div>

        {/* TODO: Make ''+ More options' work on '/onboarding-1/step-1/industry' */}

        <Link center mTop={16} style={{ alignSelf: 'center' }}>
          {t.industry[2]}
        </Link>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/review')}
          disabled={!allValid(['industry'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const review = (
      <Div flex={1} column padding="30px 16px">
        <Div flex={1} column pBottom={16} style={{ overflow: 'auto' }}>
          <H2 style={{ flex: 'none' }}>{t.review[0]}</H2>

          <Div flex="none" column mTop={8} listTop={16} style={{ pointerEvents: !this.state.reviewEditMode && 'none' }}>
            <Div listLeft={16}>
              <TextField
                label={t.name[1]}
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                style={{ flex: 1 }}
              />
              <TextField
                label={t.name[2]}
                value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                style={{ flex: 1 }}
              />
            </Div>

            <Div listLeft={16}>
              <TextField
                label={texts.misc.birthDate}
                value={this.state.birthDate}
                onChange={this.handleChange('birthDate')}
                style={{ flex: 1 }}
              />
              <TextField
                label={t.name[3]}
                value={this.state.maidenName}
                onChange={this.handleChange('maidenName')}
                style={{ flex: 1 }}
              />
            </Div>

            <Div listLeft={16}>
              <TextField
                label={texts.misc.citizenship}
                value={this.state.citizenship}
                onChange={this.handleChange('citizenship')}
                style={{ flex: 1 }}
              />
              <TextField
                label={texts.misc.birthPlace}
                value={this.state.birthPlace}
                onChange={this.handleChange('birthPlace')}
                style={{ flex: 1 }}
              />
            </Div>
          </Div>

          <Div flex="none" column listTop={16} mTop={16}>
            {this.state.reviewEditMode ? (
              residentialAddressForm
            ) : (
              <TextField
                label={texts.misc.residentialAddress}
                value={`${this.state.streetName} ${this.state.buildingNumber}${
                  this.state.apartmentNumber ? ' ' + this.state.apartmentNumber : ''
                }, ${this.state.postalCode} ${this.state.city}, ${this.state.country}`}
              />
            )}

            {this.state.isCorrespondenceAddressDifferent ? (
              this.state.reviewEditMode ? (
                correspondenceAddressForm
              ) : (
                <TextField
                  label={texts.misc.correspondenceAddress}
                  value={`${this.state.correspondenceStreetName} ${this.state.correspondenceBuildingNumber}${
                    this.state.correspondenceApartmentNumber ? ' ' + this.state.correspondenceApartmentNumber : ''
                  }, ${this.state.correspondencePostalCode} ${this.state.correspondenceCity}, ${
                    this.state.correspondenceCountry
                  }`}
                />
              )
            ) : null}
          </Div>

          <Div
            flex="none"
            column
            listTop={16}
            mTop={16}
            style={{ pointerEvents: !this.state.reviewEditMode && 'none' }}
          >
            <TextField label={texts.misc.emailAddress} value={this.state.email} onChange={this.handleChange('email')} />
            <TextField
              label={texts.misc.phoneNumber}
              value={'+49 ' + this.state.phoneNumber}
              onChange={this.handleChange('phoneNumber')}
            />
          </Div>
        </Div>

        <Button onClick={() => this.props.history.push('/onboarding-1/step-1/consents')} style={{ marginTop: 'auto' }}>
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const consentData = [
      { id: 'consent1', label: t.consents[2] },
      { id: 'consent2', label: t.consents[3] },
      { id: 'consent3', label: t.consents[4] },
      { id: 'consent4', label: t.consents[5] },
      { id: 'consent5', label: t.consents[6] }
    ]

    const consents = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.consents[0]}</H2>

        <FormControlLabel
          label={t.consents[1]}
          control={
            <Checkbox
              checked={
                this.state.consent1 &&
                this.state.consent2 &&
                this.state.consent3 &&
                this.state.consent4 &&
                this.state.consent5
              }
              onChange={event => {
                this.setState({
                  consent1: event.target.checked,
                  consent2: event.target.checked,
                  consent3: event.target.checked,
                  consent4: event.target.checked,
                  consent5: event.target.checked
                })
              }}
              value="isCorrespondenceAddressDifferent"
              color="primary"
            />
          }
        />

        <Div column mLeft={16}>
          {consentData.map(item => (
            <Div key={item.id}>
              <FormControlLabel
                label={item.label}
                control={
                  <Checkbox
                    checked={this.state[item.id]}
                    onChange={this.handleCheckboxChange(item.id)}
                    value={item.id}
                    color="primary"
                  />
                }
              />
              <Link mLeft="auto" onClick={this.handleConsentModalOpen(item.id)}>
                {texts.misc.read}
              </Link>
            </Div>
          ))}
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-1/finish')}
          disabled={!allValid(consentData.map(item => item.id), this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const finish = (
      <Div flex={1} column padding="30px 16px">
        <H2>{t.finish[0]}</H2>

        <Paragraph mTop={16}>{t.finish[1]}</Paragraph>

        <Paragraph>{t.finish[2]}</Paragraph>

        <Link mTop={36} style={{ maxWidth: 260 }} href={contractPdf} download="Contract.pdf">
          <img src={pdfIcon} alt="" style={{ marginRight: 22 }} />
          {t.finish[3]}
        </Link>

        <FormControlLabel
          label={<WithEm dangerouslySetInnerHTML={{ __html: t.finish[4] }} />}
          style={{ marginTop: 'auto' }}
          control={
            <Checkbox
              checked={this.state.consent6}
              onChange={this.handleCheckboxChange('consent6')}
              value="consent6"
              color="primary"
            />
          }
        />

        <Button
          onClick={() => this.props.history.push('/onboarding-1/step-2')}
          disabled={!allValid(['consent6'], this.state)}
          style={{ marginTop: 24 }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            {this.props.location.pathname === '/onboarding-1/step-1/finish' ? 'Account opening' : 'Personal data'}
            {this.props.location.pathname === '/onboarding-1/step-1/review' && (
              <Link
                onClick={() => this.setState({ reviewEditMode: !this.state.reviewEditMode })}
                style={{
                  position: 'absolute',
                  right: -8,
                  padding: 8,
                  textDecoration: 'none',
                  textTransform: 'uppercase'
                }}
              >
                {texts.misc.edit}
              </Link>
            )}
          </Progress>
        )}

        <Route path="/onboarding-1/step-1" exact render={() => intro} />
        <Route path="/onboarding-1/step-1/name" render={() => name} />
        <Route path="/onboarding-1/step-1/card" render={() => card} />
        <Route path="/onboarding-1/step-1/contact" render={() => contact} />
        <Route path="/onboarding-1/step-1/birth" render={() => birth} />
        <Route path="/onboarding-1/step-1/residential-address" render={() => residentialAddress} />
        <Route path="/onboarding-1/step-1/correspondence-address" render={() => correspondenceAddress} />
        <Route path="/onboarding-1/step-1/tax-information" render={() => taxInformation} />
        <Route path="/onboarding-1/step-1/occupational-status" render={() => occupationalStatus} />
        <Route path="/onboarding-1/step-1/industry" render={() => industry} />
        <Route path="/onboarding-1/step-1/review" render={() => review} />
        <Route path="/onboarding-1/step-1/consents" render={() => consents} />
        <Route path="/onboarding-1/step-1/finish" render={() => finish} />

        <Dialog open={Boolean(this.state.showConsentModal)} onClose={this.handleConsentModalClose}>
          <DialogTitle>{consentData.find(item => item.id === this.state.showConsentModalId).label}</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <MuiButton onClick={this.handleConsentModalClose} color="primary">
              {texts.misc.okay}
            </MuiButton>
          </DialogActions>
        </Dialog>

        <NativeModal
          type="location"
          open={this.state.showLocationModal}
          onClose={this.handleLocationModalClose}
          onConfirm={this.handleLocationModalConfirm}
        />
      </Fragment>
    )
  }
}

export default withTexts(Step1Page)

const WithEm = styled.div`
  em {
    font-style: normal;
    color: #f39100;
  }
`

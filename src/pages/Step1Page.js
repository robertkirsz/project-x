import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import { H1, H2, Paragraph, Small, Link } from 'components/Typography'
import StepStatus, { Step } from 'components/StepStatus'
import Button from 'components/Button'
import CardCarousel from 'components/CardCarousel'
import Progress from 'components/Progress'
import PhoneInput from 'components/PhoneInput'

import logo from 'assets/logo.svg'
import mapMarker from 'assets/map-marker.svg'
import pdfIcon from 'assets/pdf-icon.svg'

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
    countryOfTax: '',
    taxId: '',
    job: '',
    industry: '',
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
    consent5: false,
    consent6: false,
    reviewEditMode: false
  }

  change = name => value => this.setState({ [name]: value })

  handleChange = name => event => this.setState({ [name]: event.target.value })

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  isValid = keys => {
    for (let index in keys) return Boolean(this.state[keys[index]])
  }

  prefillResidentialAddress = () => {
    this.setState({
      postalCode: '23-946',
      city: 'Hamburg',
      streetName: 'Parkstr',
      buildingNumber: '25',
      apartmentNumber: '23',
      country: 'Germany'
    })
  }

  prefillCorrespondenceAddress = () => {
    this.setState({
      correspondencePostalCode: '10-329',
      correspondenceCity: 'Berlin',
      correspondenceStreetName: 'Sommerallee',
      correspondenceBuildingNumber: '23',
      correspondenceApartmentNumber: '12',
      correspondenceCountry: 'Germany'
    })
  }

  render() {
    // console.log('this.state', this.state)

    const residentialAddressForm = (
      <Div column listTop={12} mTop={8}>
        <Div listLeft={16}>
          <TextField
            label="Postal code"
            value={this.state.postalCode}
            onChange={this.handleChange('postalCode')}
            style={{ flex: 1 }}
          />
          <TextField label="City" value={this.state.city} onChange={this.handleChange('city')} style={{ flex: 1 }} />
        </Div>

        <TextField label="Street name" value={this.state.streetName} onChange={this.handleChange('streetName')} />

        <Div listLeft={16}>
          <TextField
            label="Building number"
            type="number"
            value={this.state.buildingNumber}
            onChange={this.handleChange('buildingNumber')}
            style={{ flex: 1 }}
          />
          <TextField
            label="Apartment number"
            type="number"
            value={this.state.apartmentNumber}
            onChange={this.handleChange('apartmentNumber')}
            style={{ flex: 1 }}
          />
        </Div>

        <FormControl style={{ width: 'calc(50% - 8px)' }}>
          <InputLabel htmlFor="country">Country</InputLabel>
          <Select
            value={this.state.country}
            onChange={this.handleChange('country')}
            inputProps={{ name: 'country', id: 'country' }}
          >
            <MenuItem value="Germany">Germany</MenuItem>
            <MenuItem value="France">France</MenuItem>
            <MenuItem value="Belgium">Belgium</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          label="My correspondence address is different"
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
      <Div column listTop={12} mTop={8}>
        <Div listLeft={16}>
          <TextField
            label="Postal code"
            value={this.state.correspondencePostalCode}
            onChange={this.handleChange('correspondencePostalCode')}
            style={{ flex: 1 }}
          />
          <TextField
            label="City"
            value={this.state.correspondenceCity}
            onChange={this.handleChange('correspondenceCity')}
            style={{ flex: 1 }}
          />
        </Div>

        <TextField
          label="Street name"
          value={this.state.correspondenceStreetName}
          onChange={this.handleChange('correspondenceStreetName')}
        />

        <Div listLeft={16}>
          <TextField
            label="Building number"
            type="number"
            value={this.state.correspondenceBuildingNumber}
            onChange={this.handleChange('correspondenceBuildingNumber')}
            style={{ flex: 1 }}
          />
          <TextField
            label="Apartment number"
            type="number"
            value={this.state.correspondenceApartmentNumber}
            onChange={this.handleChange('correspondenceApartmentNumber')}
            style={{ flex: 1 }}
          />
        </Div>

        <FormControl style={{ width: 'calc(50% - 8px)' }}>
          <InputLabel htmlFor="correspondenceCountry">Country</InputLabel>
          <Select
            value={this.state.correspondenceCountry}
            onChange={this.handleChange('correspondenceCountry')}
            inputProps={{ name: 'correspondenceCountry', id: 'correspondenceCountry' }}
          >
            <MenuItem value="Germany">Germany</MenuItem>
            <MenuItem value="France">France</MenuItem>
            <MenuItem value="Belgium">Belgium</MenuItem>
          </Select>
        </FormControl>
      </Div>
    )

    const currentStep = paths.findIndex(path => path === this.props.location.pathname)

    const intro = (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />

        <H1 mTop={13}>Get your new mBank account in only 3 simple steps and start with...</H1>

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
        <H2>Please tell us something about yourself</H2>

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
        <H2>Great, {this.state.firstName}! Select your card design</H2>

        <CardCarousel value={this.state.chosenCard} onChange={this.change('chosenCard')} />

        <Button onClick={() => this.props.history.push('/step-1/contact')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    const contact = (
      <Div flex={1} column padding="30px 16px">
        <H2>We need your contact information</H2>

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
        <H2>Please enter your...</H2>

        <Div column listTop={12} mTop={8}>
          <TextField
            label="Birth date"
            type="date"
            value={this.state.birthDate}
            onChange={this.handleChange('birthDate')}
            InputLabelProps={{ shrink: true }}
          />

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
        <H2>Please enter your address</H2>

        <Small mTop={8}>Make sure that this is the adress you are registered to</Small>

        <Link mTop={12} onClick={this.prefillResidentialAddress}>
          <img src={mapMarker} alt="Map marker" style={{ marginRight: 8 }} />Use my current location
        </Link>

        {residentialAddressForm}

        <Button
          onClick={() =>
            this.props.history.push(
              this.state.isCorrespondenceAddressDifferent ? '/step-1/correspondence-address' : '/step-1/tax-information'
            )
          }
          disabled={!this.isValid(['postalCode', 'city', 'streetName', 'buildingNumber', 'country'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const correspondenceAddress = (
      <Div flex={1} column padding="30px 16px">
        <H2>Add your correspondence address</H2>

        <Link mTop={12} onClick={this.prefillCorrespondenceAddress}>
          <img src={mapMarker} alt="Map marker" style={{ marginRight: 8 }} />Use my current location
        </Link>

        {correspondenceAddressForm}

        <Button
          onClick={() => this.props.history.push('/step-1/tax-information')}
          disabled={
            !this.isValid([
              'correspondencePostalCode',
              'correspondenceCity',
              'correspondenceStreetName',
              'correspondenceBuildingNumber',
              'correspondenceCountry'
            ])
          }
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const taxInformation = (
      <Div flex={1} column padding="30px 16px">
        <H2>Do you want to add your tax information?</H2>

        <Small mTop={8}>
          This is optional, but we have to ask this for legal reasons. You can also add this up to 90 days later.
        </Small>

        <Div column listTop={12} mTop={24}>
          <TextField
            label="Country of tax obligation"
            value={this.state.countryOfTax}
            onChange={this.handleChange('countryOfTax')}
            placeholder="(optional)"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Tax ID"
            value={this.state.taxId}
            onChange={this.handleChange('taxId')}
            placeholder="(optional)"
            InputLabelProps={{ shrink: true }}
          />
        </Div>

        <Link center mTop={16} style={{ alignSelf: 'center' }}>
          + Add more
        </Link>

        <Button onClick={() => this.props.history.push('/step-1/occupational-status')} style={{ marginTop: 'auto' }}>
          Next step
        </Button>
      </Div>
    )

    const occupationalStatus = (
      <Div flex={1} column padding="30px 16px">
        <H2>What’s your occupational status?</H2>

        <Small mTop={8}>Again, we have to ask this for legal reasons</Small>

        <Div column mTop={32}>
          <FormControl>
            <InputLabel htmlFor="jobSelect">Select job role</InputLabel>
            <Select
              value={this.state.job}
              onChange={this.handleChange('job')}
              inputProps={{ name: 'job', id: 'jobSelect' }}
            >
              <MenuItem value="Office manager">Office manager</MenuItem>
              <MenuItem value="Creative director">Creative director</MenuItem>
              <MenuItem value="Product manager">Product manager</MenuItem>
            </Select>
          </FormControl>
        </Div>

        <Button
          onClick={() => this.props.history.push('/step-1/industry')}
          disabled={!this.isValid(['job'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const industry = (
      <Div flex={1} column padding="30px 16px">
        <H2>In which industry are you employed?</H2>

        <Small mTop={8}>That is the last one!</Small>

        <Div column mTop={24} pLeft={24}>
          <FormControl component="fieldset" required>
            <RadioGroup name="industry" value={this.state.industry} onChange={this.handleChange('industry')}>
              <FormControlLabel value="No information" control={<Radio color="primary" />} label="No information" />
              <FormControlLabel value="Finance" control={<Radio color="primary" />} label="Finance" />
              <FormControlLabel value="Manufacturing" control={<Radio color="primary" />} label="Manufacturing" />
              <FormControlLabel value="Tourism" control={<Radio color="primary" />} label="Tourism" />
            </RadioGroup>
          </FormControl>
        </Div>

        <Link center mTop={16} style={{ alignSelf: 'center' }}>
          + More options
        </Link>

        <Button
          onClick={() => this.props.history.push('/step-1/review')}
          disabled={!this.isValid(['industry'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const review = (
      <Div flex={1} column padding="30px 16px">
        <H2>Please review all you data carefully. In case of any mistakes you can edit it now.</H2>

        <Div listLeft={16}>
          <TextField label="Name" value={this.state.name} onChange={this.handleChange('name')} style={{ flex: 1 }} />
          <TextField
            label="Last name"
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}
            style={{ flex: 1 }}
          />
        </Div>

        <Div listLeft={16}>
          <TextField
            label="Date of birth"
            value={this.state.birthDate}
            onChange={this.handleChange('birthDate')}
            style={{ flex: 1 }}
          />
          <TextField
            label="Maiden name"
            value={this.state.maidenName}
            onChange={this.handleChange('maidenName')}
            style={{ flex: 1 }}
          />
        </Div>

        <Div listLeft={16}>
          <TextField
            label="Citizenship"
            value={this.state.citizenship}
            onChange={this.handleChange('citizenship')}
            style={{ flex: 1 }}
          />
          <TextField
            label="Place of birth"
            value={this.state.birthPlace}
            onChange={this.handleChange('birthPlace')}
            style={{ flex: 1 }}
          />
        </Div>

        {this.state.reviewEditMode ? (
          residentialAddressForm
        ) : (
          <TextField label="Address" value={this.state.name} readOnly />
        )}

        {this.state.reviewEditMode ? (
          correspondenceAddressForm
        ) : (
          <TextField label="Correspondence address" value={this.state.name} readOnly />
        )}

        <TextField label="Email address" value={this.state.email} onChange={this.handleChange('email')} />
        <TextField
          label="Phone number"
          value={'+49 ' + this.state.phoneNumber}
          onChange={this.handleChange('phoneNumber')}
        />
      </Div>
    )

    const consents = (
      <Div flex={1} column padding="30px 16px">
        <H2>Almost done! Only a few consents left</H2>

        <FormControlLabel
          label="Confirm all"
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
          <Div>
            <FormControlLabel
              label="Electronic communication"
              control={
                <Checkbox
                  checked={this.state.consent1}
                  onChange={this.handleCheckboxChange('consent1')}
                  value="consent1"
                  color="primary"
                />
              }
            />
            <Link mLeft="auto">Read</Link>
          </Div>

          <Div>
            <FormControlLabel
              label="Terms of Service of mBank and IDNow"
              control={
                <Checkbox
                  checked={this.state.consent2}
                  onChange={this.handleCheckboxChange('consent2')}
                  value="consent2"
                  color="primary"
                />
              }
            />
            <Link mLeft="auto">Read</Link>
          </Div>

          <Div>
            <FormControlLabel
              label="Advertisement of mBank partners"
              control={
                <Checkbox
                  checked={this.state.consent3}
                  onChange={this.handleCheckboxChange('consent3')}
                  value="consent3"
                  color="primary"
                />
              }
            />
            <Link mLeft="auto">Read</Link>
          </Div>

          <Div>
            <FormControlLabel
              label="Data processing and usage"
              control={
                <Checkbox
                  checked={this.state.consent4}
                  onChange={this.handleCheckboxChange('consent4')}
                  value="consent4"
                  color="primary"
                />
              }
            />
            <Link mLeft="auto">Read</Link>
          </Div>

          <Div>
            <FormControlLabel
              label="General Data Protection Regulation"
              control={
                <Checkbox
                  checked={this.state.consent5}
                  onChange={this.handleCheckboxChange('consent5')}
                  value="consent5"
                  color="primary"
                />
              }
            />
            <Link mLeft="auto">Read</Link>
          </Div>
        </Div>

        <Button
          onClick={() => this.props.history.push('/step-1/finish')}
          disabled={!this.isValid(['consent1', 'consent2', 'consent3', 'consent4', 'consent5'])}
          style={{ marginTop: 'auto' }}
        >
          Next step
        </Button>
      </Div>
    )

    const finish = (
      <Div flex={1} column padding="30px 16px">
        <H2>Finally, let’s open your mBank account!</H2>

        <Paragraph mTop={16}>
          Below is a link to the contract.<br />
          But you don’t need to download it now, as we already sent it to you by email.
        </Paragraph>

        <Link mTop={36} style={{ maxWidth: 260 }}>
          <img src={pdfIcon} alt="PDF Icon" style={{ marginRight: 22 }} /> Download the full mBank Account Contract (PDF)
        </Link>

        <FormControlLabel
          label={<div>I want to open an mBank account and confirm that I act on <Link>my own behalf</Link></div>}
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
          onClick={() => this.props.history.push('/step-1/finish')}
          disabled={!this.isValid(['consent6'])}
          style={{ marginTop: 24 }}
        >
          Next step
        </Button>
      </Div>
    )

    return (
      <Fragment>
        {!this.props.match.isExact && (
          <Progress currentStep={currentStep} paths={paths}>
            {this.props.location.pathname === '/step-1/finish' ? 'Account opening' : 'Personal data'}
            {this.props.location.pathname === '/step-1/review' && (
              <Link
                onClick={() => this.setState({ reviewEditMode: !this.state.reviewEditMode })}
                style={{ position: 'absolute', right: -8, padding: 8, textDecoration: 'none' }}
              >
                EDIT
              </Link>
            )}
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

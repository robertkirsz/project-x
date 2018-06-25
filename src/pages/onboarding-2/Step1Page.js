import React, { Component, Fragment } from 'react'
import { Div } from 'styled-kit'
import { Route } from 'react-router-dom'

import uuid from 'utils/uuid'
import allValid from 'utils/allValid'
import validateEmail from 'utils/validateEmail'
import { withTexts } from 'providers/TextProvider'

import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { H2, Small, Link } from 'components/Typography'
import Button from 'components/Button'

class Step1Page extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
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
    taxes: [
      {
        id: uuid(),
        countryOfTax: '',
        taxId: ''
      }
    ],
    job: '',
    industry: ''
  }

  handleChange = name => event => {
    if (name === 'firstName') {
      sessionStorage.setItem('firstName', event.target.value)
    }

    if (name === 'lastName') {
      sessionStorage.setItem('lastName', event.target.value)
    }

    this.setState({ [name]: event.target.value })
  }

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

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

  render() {
    const { texts } = this.props

    const t = texts.onboarding1.step1

    const name = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>{t.name[0]}</H2>

        <Div listLeft={12} mTop={8}>
          <TextField label={t.name[1]} value={this.state.firstName} onChange={this.handleChange('firstName')} />

          <TextField label={t.name[2]} value={this.state.lastName} onChange={this.handleChange('lastName')} />
        </Div>

        <TextField
          label={texts.misc.emailAddress}
          type="email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          style={{ marginTop: 12 }}
        />

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-1/birth')}
          disabled={!allValid(['firstName', 'lastName', 'email'], this.state, { email: validateEmail })}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const birth = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>{t.birth[1]}</H2>

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
          onClick={() => this.props.history.push('/onboarding-2/step-1/residential-address')}
          disabled={!allValid(['birthDate', 'birthPlace', 'citizenship'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const residentialAddress = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>
          {texts.misc.thanks} {t.residentialAddress[0]}
        </H2>

        <Small mTop={8}>{t.residentialAddress[1]}</Small>

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

          <Div listLeft={16}>
            <TextField
              label={texts.misc.streetName}
              value={this.state.streetName}
              onChange={this.handleChange('streetName')}
              style={{ flex: 1 }}
            />

            <TextField
              label={t.residentialAddress[4]}
              value={this.state.streetNumber}
              onChange={this.handleChange('streetNumber')}
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

        <Button
          onClick={() =>
            this.props.history.push(
              this.state.isCorrespondenceAddressDifferent
                ? '/onboarding-2/step-1/correspondence-address'
                : '/onboarding-2/step-1/tax-information'
            )
          }
          disabled={!allValid(['postalCode', 'city', 'streetName', 'streetNumber', 'country'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const correspondenceAddress = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>{t.correspondenceAddress[0]}</H2>

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

          <Div listLeft={16}>
            <TextField
              label={texts.misc.streetName}
              value={this.state.correspondenceStreetName}
              onChange={this.handleChange('correspondenceStreetName')}
              style={{ flex: 1 }}
            />

            <TextField
              label={t.residentialAddress[4]}
              value={this.state.correspondenceStreetNumber}
              onChange={this.handleChange('correspondenceStreetNumber')}
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

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-1/tax-information')}
          disabled={
            !allValid(
              [
                'correspondencePostalCode',
                'correspondenceCity',
                'correspondenceStreetName',
                'correspondenceStreetNumber',
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
      <Div flex={1} column padding="150px 16px 30px">
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
          onClick={() => this.props.history.push('/onboarding-2/step-1/occupational-status')}
          style={{ flex: 'none', marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    const occupationalStatus = (
      <Div flex={1} column padding="150px 16px 30px">
        <H2>{t.occupationalStatus[0]}</H2>

        <Small mTop={8}>
          {t.occupationalStatus[1]} {t.occupationalStatus[3]}
        </Small>

        <Div column mTop={24}>
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

          <FormControl>
            <InputLabel htmlFor="industrySelect">{t.occupationalStatus[3]}</InputLabel>
            <Select
              value={this.state.industry}
              onChange={this.handleChange('industry')}
              inputProps={{ name: 'industry', id: 'industrySelect' }}
            >
              {t.industry.industries.map(industry => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Div>

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-1/industry')}
          disabled={!allValid(['job', 'industry'], this.state)}
          style={{ marginTop: 'auto' }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )

    return (
      <Fragment>
        <Route path="/onboarding-2/step-1/name" render={() => name} />
        <Route path="/onboarding-2/step-1/birth" render={() => birth} />
        <Route path="/onboarding-2/step-1/residential-address" render={() => residentialAddress} />
        <Route path="/onboarding-2/step-1/correspondence-address" render={() => correspondenceAddress} />
        <Route path="/onboarding-2/step-1/tax-information" render={() => taxInformation} />
        <Route path="/onboarding-2/step-1/occupational-status" render={() => occupationalStatus} />
      </Fragment>
    )
  }
}

export default withTexts(Step1Page)

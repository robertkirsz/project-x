import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Div } from 'styled-kit'
import MaskedInput from 'react-text-mask'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import Button from 'components/Button'
import { Heading, Paragraph, Link } from 'components/Typography'

import logo from 'assets/logo.svg'

const TextMaskCustom = props => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput {...other} ref={inputRef} mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]} />
  )
}

export default class FirstLoginPage extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    phoneNumber: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  validatePhoneNumber = value => value.length === 11 && value.indexOf('_') === -1

  render() {
    return (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <img src={logo} alt="Logo" width="108" />
        <Heading center mTop={13}>
          Hi, Welcome!
        </Heading>
        <Paragraph center mTop={12}>
          To start please provide your mobile phone number
        </Paragraph>

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
              inputComponent={TextMaskCustom}
            />
          </FormControl>
        </Div>

        <Link center mTop="auto" onClick={() => this.props.history.push('/404')}>
          Already have an account
        </Link>

        <Button
          disabled={!this.validatePhoneNumber(this.state.phoneNumber)}
          onClick={() => this.props.history.push('/first-login')}
          style={{ marginTop: 26 }}
        >
          Next step
        </Button>
      </Div>
    )
  }
}

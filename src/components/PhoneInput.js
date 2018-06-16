import React from 'react'
import { Div } from 'styled-kit'
import MaskedInput from 'react-text-mask'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

const phoneNumberMask = [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]

const TextMaskCustom = ({ inputRef, ...other }) => <MaskedInput {...other} ref={inputRef} mask={phoneNumberMask} />

export default props => (
  <Div itemsCenter listLeft={16} selfStretch mTop={12}>
    <TextField select label="Country" value="+49" style={{ pointerEvents: 'none' }}>
      <MenuItem value="+49">+49</MenuItem>
    </TextField>

    <FormControl style={{ flex: 1 }}>
      <InputLabel htmlFor="phone-number-input">Phone number</InputLabel>

      <Input id="phone-number-input" type="tel" inputComponent={TextMaskCustom} {...props} />
    </FormControl>
  </Div>
)

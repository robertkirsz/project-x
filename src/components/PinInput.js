import React from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import Button from '@material-ui/core/Button'

import logo from 'assets/pin-logo.svg'

export default props => {
  const handleChange = number => event => {
    const value = props.value + number
    if (value.length > 8) return
    props.onChange(value)
  }

  return (
    <Wrapper column itemsCenter mTop={32} padding="0 28px 14px">
      <Logo src={logo} alt="Logo" />

      <Div listLeft={20} mTop={23} height={14}>
        {props.value.split('').map((dot, index) => <Dot key={index} />)}
      </Div>

      <Info>{props.children}</Info>

      <Keyboard mTop={8} wraps justifyCenter>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(number => (
          <Button key={number} onClick={handleChange(number)}>
            {number}
          </Button>
        ))}
      </Keyboard>
    </Wrapper>
  )
}

const Wrapper = Div.extend`
  border: 2px solid #e8e8e8;
  border-radius: 4px;
  width: 290px;
`

const Info = styled.div`
  height: 36px;
  text-align: center;
  opacity: 0.3;
  font-size: 14px;
  color: #1f1a15;
  letter-spacing: 0;
  line-height: 36px;
  text-transform: uppercase;
`

const Logo = styled.img`
  display: block;
  margin-top: -25px;
`

const Dot = styled.span`
  display: block;
  width: 14px;
  height: 14px;
  background: #f39100;
  border-radius: 50%;
  opacity: 0.5;
`

const Keyboard = Div.extend`
  > button {
    width: 60px;
    min-width: 0;
    margin: 6px;
  }
`

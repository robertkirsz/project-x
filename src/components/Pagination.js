import React from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { rgba } from 'polished'

export default ({ size, value, onChange, small, ...props }) => (
  <Div flex="none" itemsCenter listLeft={small ? 8 : 12} {...props}>
    {[...Array(size)].map((element, index) => (
      <Dot key={index} small={small} isActive={value === index} onClick={onChange(index)} />
    ))}
  </Div>
)

const Dot = styled.span`
  display: block;
  width: ${props => (props.small ? 6 : 10)}px;
  height: ${props => (props.small ? 6 : 10)}px;
  border-radius: 50%;
  background: ${props => (props.isActive ? 'black' : rgba('black', 0.2))};
  transition: 0.3s;
  cursor: pointer;
`

import React from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

export default ({ size, value, onChange, ...props }) => (
  <Div flex="none" itemsCenter listLeft={12} {...props}>
    {[...Array(size)].map((element, index) => <Dot key={index} isActive={value === index} onClick={onChange(index)} />)}
  </Div>
)

const Dot = styled.span`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => (props.isActive ? 'black' : 'rgba(0, 0, 0, 0.2)')};
  transition: 0.3s;
  cursor: pointer;
`

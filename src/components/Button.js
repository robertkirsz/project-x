import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { colors } from 'styles'

const dotAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }

  40% {
    opacity: 1;
    transform: scale(1.0);
  }
`

export const ButtonSpinner = props => (
  <ButtonSpinnerWrapper {...props}>
    <Dot />
    <Dot />
    <Dot />
  </ButtonSpinnerWrapper>
)

const ButtonSpinnerWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const Dot = styled.span`
  display: block;
  width: 12px;
  height: 12px;

  margin: 0 3px;

  background: currentColor;
  border-radius: 50%;

  animation: ${dotAnimation} 1s infinite;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`

export default styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex: none;
  font-family: inherit;
  height: 52px;
  background: ${({ theme }) => (theme.darkMode ? 'white' : colors.darkRed)};
  border: none;
  outline: none;
  border-radius: 100px;
  font-size: 18px;
  color: ${({ theme }) => (theme.darkMode ? colors.green : 'white')};
  letter-spacing: 0;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  ${props =>
    props.secondary &&
    css`
      color: ${colors.darkRed};
      border: 2px solid ${colors.darkRed};
      background: white;
    `} &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`

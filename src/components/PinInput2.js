import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Div } from 'styled-kit'

import { colors } from 'styles'

const createValues = (value, length) => {
  let result = Array(length).fill('')

  if (value !== undefined && value !== '') {
    return result.map(
      (existingValue, valueIndex) => (value[valueIndex] !== undefined ? value[valueIndex] : existingValue)
    )
  }

  return result
}

export default class PinInput2 extends Component {
  static getDerivedStateFromProps = ({ value, length }) => ({ values: createValues(value, length) })

  inputRefs = Array(this.props.length).fill(null)

  state = {
    values: createValues(this.props.value, this.props.length)
  }

  handleChange = inputIndex => event => {
    event.stopPropagation()

    let inputValue = event.target.value

    if (inputValue.length) inputValue = inputValue.split('').pop()

    const values = this.state.values.map(
      (existingValue, valueIndex) => (inputIndex === valueIndex ? inputValue : existingValue)
    )

    if (inputValue !== '') this.moveFocus(inputIndex, 'next')

    this.props.onChange(values.join(''))
  }

  handleKeyDown = inputIndex => event => {
    event.stopPropagation()

    if (this.state.values[inputIndex] !== '') return

    const key = event.keyCode || event.charCode

    if (key === 8 || key === 46) this.moveFocus(inputIndex, 'previous')
  }

  moveFocus = (currentIndex, direction) => {
    let newIndex

    if (direction === 'next') newIndex = Math.min(currentIndex + 1, this.state.values.length - 1)

    if (direction === 'previous') newIndex = Math.max(currentIndex - 1, 0)

    if (newIndex === currentIndex) return

    this.inputRefs[newIndex].focus()
  }

  render() {
    const { values } = this.state

    return (
      <Wrapper listLeft={16} style={this.props.style} isValid={this.props.isValid}>
        <Input
          value={values[0]}
          innerRef={node => (this.inputRefs[0] = node)}
          onChange={this.handleChange(0)}
          onKeyDown={this.handleKeyDown(0)}
          autoComplete="new_password"
        />

        <Input
          value={values[1]}
          innerRef={node => (this.inputRefs[1] = node)}
          onChange={this.handleChange(1)}
          onKeyDown={this.handleKeyDown(1)}
          autoComplete="new_password"
        />

        <Input
          value={values[2]}
          innerRef={node => (this.inputRefs[2] = node)}
          onChange={this.handleChange(2)}
          onKeyDown={this.handleKeyDown(2)}
          autoComplete="new_password"
        />

        <span>-</span>

        <Input
          value={values[3]}
          innerRef={node => (this.inputRefs[3] = node)}
          onChange={this.handleChange(3)}
          onKeyDown={this.handleKeyDown(3)}
          autoComplete="new_password"
        />

        <Input
          value={values[4]}
          innerRef={node => (this.inputRefs[4] = node)}
          onChange={this.handleChange(4)}
          onKeyDown={this.handleKeyDown(4)}
          autoComplete="new_password"
        />

        <Input
          value={values[5]}
          innerRef={node => (this.inputRefs[5] = node)}
          onChange={this.handleChange(5)}
          onKeyDown={this.handleKeyDown(5)}
          autoComplete="new_password"
        />
      </Wrapper>
    )
  }
}

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 38px;
  height: 36px;

  border: none;
  background: none;
  outline: none;
  border-bottom: 2px solid #ccc;

  transition: 0.3s;
  font: inherit;
  text-align: center;

  &:focus {
    border-color: ${colors.orange};
  }
`

const Wrapper = Div.extend`
  font-family: Roboto;
  font-size: 32px;
  color: #1f1a15;
  letter-spacing: 0;
  text-align: center;

  ${props =>
    props.isValid &&
    css`
      ${Input} {
        border-color: ${colors.green};
      }
    `};
`

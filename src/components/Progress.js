import React, { Component } from 'react'
import styled from 'styled-components'

import { Heading } from 'components/Typography'

export default class Progress extends Component {
  state = {}

  render () {
    const percent = this.props.currentStep / this.props.allSteps * 100
    return (
      <Wrapper>
        <Heading center>{this.props.children}</Heading>
        <Line><Fill style={{ width: `${percent}%` }} /></Line>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 16px 24px;
`

const Line = styled.div`
  width: 100%;
  height: 3px;
  background: #E8E8E8;
  border-radius: 4px;
  margin-top: 8px;
`

const Fill = styled.div`
  height: 100%;
  background: #20A134;
  border-radius: 4px;
  transition: 0.3s;
`

import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { Heading } from 'components/Typography'

export default class Progress extends Component {
  state = {}

  render() {
    const percent = (this.props.currentStep / this.props.paths.length) * 100

    return (
      <Wrapper>
        <Div justifyAround itemsCenter>
          <button>Prev</button>
          <Heading center>{this.props.children}</Heading>
          <button>Next</button>
        </Div>
        <Line>
          <Fill style={{ width: `${percent}%` }} />
        </Line>
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
  background: #e8e8e8;
  border-radius: 4px;
  margin-top: 8px;
`

const Fill = styled.div`
  height: 100%;
  background: #20a134;
  border-radius: 4px;
  transition: 0.3s;
`

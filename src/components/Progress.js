import React from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { withRouter } from 'react-router-dom'

import { H2 } from 'components/Typography'

import arrow from 'assets/arrow-left.svg'

const Progress = props => (
  <Wrapper>
    <Div relative justifyAround itemsCenter>
      <Arrow src={arrow} onClick={props.history.goBack} />
      <H2 center>{props.children}</H2>
    </Div>
    <Line>
      <Fill style={{ width: `${((props.currentStep + 1) / props.paths.length) * 100}%` }} />
    </Line>
  </Wrapper>
)

export default withRouter(Progress)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  padding: 0 16px;
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

const Arrow = styled.img`
  position: absolute;
  left: -14px;
  padding: 8px;
`

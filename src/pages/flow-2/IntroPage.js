import React, { Component } from 'react'
import { Div } from 'styled-kit'

import { H1 } from 'components/Typography'

export default class IntroPage2 extends Component {
  goNext = () => this.props.history.push('/onboarding-2/usp/1')

  render = () => (
    <Div flex={1} onClick={this.goNext}>
      <H1 center style={{ margin: 'auto' }}>
        <strong>Work in progress</strong>
      </H1>
    </Div>
  )
}

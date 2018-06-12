import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Div } from 'styled-kit'

import IntroPage from 'pages/IntroPage'
import UspPage from 'pages/UspPage'

import motife from 'assets/motife-collapsed.png'

export default class App extends Component {
  render() {
    return (
      <Background flex={1} column>
        <Switch>
          <Route path="/intro" component={IntroPage} />
          <Route path="/usp" component={UspPage} />
        </Switch>
      </Background>
    )
  }
}

const Background = Div.extend`
  background: url(${motife}) center bottom no-repeat;
  background-size: contain;
`

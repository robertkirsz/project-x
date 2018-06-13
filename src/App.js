import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Div } from 'styled-kit'

import preloadImages from 'utils/preloadImages'

import TextField from '@material-ui/core/TextField'

import IntroPage from 'pages/IntroPage'
import UspPage from 'pages/UspPage'

import motife from 'assets/motife-collapsed.png'

export default class App extends Component {
  state = {
    password: '',
    loggedIn: sessionStorage.getItem('loggedIn'),
    imagesLoaded: false
  }

  componentDidMount() {
    preloadImages().then(() => this.setState({ imagesLoaded: true }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loggedIn && this.state.imagesLoaded && this.state.password === 'test') {
      sessionStorage.setItem('loggedIn', true);
      setTimeout(() => this.setState({ loggedIn: true }), 500)
    }
  }

  changePassword = event => this.setState({ password: event.target.value })

  render() {
    const { password, loggedIn } = this.state

    return (
      <Background flex={1} column loggedIn={loggedIn}>
        {!loggedIn && (
          <TextField label="Password" value={password} onChange={this.changePassword} autoFocus style={{ margin: 'auto' }} />
        )}
        {loggedIn && (
          <Switch>
            <Route path="/" exact component={IntroPage} />
            <Route path="/usp" component={UspPage} />
          </Switch>
        )}
      </Background>
    )
  }
}

const Background = Div.extend`
  ${props => props.loggedIn && `
    background: url(${motife}) center bottom no-repeat;
    background-size: contain;
  `}
`

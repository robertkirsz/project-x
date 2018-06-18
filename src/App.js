import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Div } from 'styled-kit'

import preloadImages from 'utils/preloadImages'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import RouteChanger from 'components/RouteChanger'

// Flow 1
import IntroPage from 'pages/IntroPage'
import UspPage from 'pages/UspPage'
import FirstLoginPage from 'pages/FirstLoginPage'
import NotFoundPage from 'pages/NotFoundPage'
import Step1Page from 'pages/Step1Page'
// Flow 2
import IntroPage2 from 'pages/flow-2/IntroPage'

import motife from 'assets/motife-collapsed.png'

export default class App extends Component {
  state = {
    password: '',
    loggedIn: Boolean(sessionStorage.getItem('loggedIn')),
    imagesLoaded: false
  }

  componentDidMount() {
    preloadImages().then(() => this.setState({ imagesLoaded: true }))
  }

  changePassword = event => this.setState({ password: event.target.value })

  startFlow = number => event => {
    if ((!this.state.loggedIn && this.state.password !== 'test') || !this.state.imagesLoaded) return

    sessionStorage.setItem('loggedIn', true)
    this.setState({ loggedIn: true })
    this.props.history.push(`/onboarding-${number}/intro`)
  }

  render() {
    const { password, loggedIn, imagesLoaded } = this.state

    return (
      <Background flex={1} column loggedIn={loggedIn}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Div column itemsCenter margin="auto">
                {!loggedIn && <TextField label="Password" value={password} onChange={this.changePassword} />}

                <Div listLeft={16} mTop={32}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.startFlow(1)}
                    disabled={(!loggedIn && password !== 'test') || !imagesLoaded}
                  >
                    {imagesLoaded ? 'Flow 1' : 'Loading...'}
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.startFlow(2)}
                    disabled={(!loggedIn && password !== 'test') || !imagesLoaded}
                  >
                    {imagesLoaded ? 'Flow 2' : 'Loading...'}
                  </Button>
                </Div>
              </Div>
            )}
          />

          {loggedIn && (
            <Fragment>
              {/* Flow 1 */}
              <Route path="/onboarding-1/intro" component={IntroPage} />
              <Route path="/onboarding-1/usp" component={UspPage} />
              <Route path="/onboarding-1/first-login" component={FirstLoginPage} />
              <Route path="/onboarding-1/step-1" component={Step1Page} />
              {/* Flow 2 */}
              <Route path="/onboarding-2/intro" component={IntroPage2} />
            </Fragment>
          )}

          {/* 404 */}
          <Route component={NotFoundPage} />
        </Switch>

        {process.env.NODE_ENV === 'development' && (
          <RouteChanger location={this.props.location} history={this.props.history} />
        )}
      </Background>
    )
  }
}

/* prettier-ignore */
const Background = Div.extend`
  ${props => props.loggedIn && `
    background: url(${motife}) center bottom no-repeat;
    background-size: contain;
  `}
`

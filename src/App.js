import React, { Component } from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Div } from 'styled-kit'

import preloadImages from 'utils/preloadImages'
import TextProvider from 'providers/TextProvider'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiSwitch from '@material-ui/core/Switch'

import Background from 'components/Background'
import RouteChanger from 'components/RouteChanger'
import PrivateRoute from 'components/PrivateRoute'

// Flow 1
import IntroPage from 'pages/flow-1/IntroPage'
import UspPage from 'pages/flow-1/UspPage'
import FirstLoginPage from 'pages/flow-1/FirstLoginPage'
import Step1Page from 'pages/flow-1/Step1Page'
import Step2Page from 'pages/flow-1/Step2Page'
import Step3Page from 'pages/flow-1/Step3Page'

// Flow 2
import IntroPage2 from 'pages/flow-2/IntroPage'
import UspPage2 from 'pages/flow-2/UspPage'

// 404
import NotFoundPage from 'pages/NotFoundPage'

const VERSION = 'v0.5.6'

class App extends Component {
  state = {
    password: '',
    loggedIn: Boolean(sessionStorage.getItem('loggedIn')),
    imagesLoaded: false,
    shouldPrefillData: false,
    language: sessionStorage.getItem('language') || 'english'
  }

  componentDidMount = () => preloadImages().then(() => this.setState({ imagesLoaded: true }))

  changePassword = event => this.setState({ password: event.target.value })

  startFlow = number => event => {
    if ((!this.state.loggedIn && this.state.password !== 'test') || !this.state.imagesLoaded) return

    sessionStorage.setItem('loggedIn', true)
    this.setState({ loggedIn: true })
    this.props.history.push(`/onboarding-${number}/intro`)
  }

  changeLanguage = event => {
    const language = event.target.checked ? 'german' : 'english'
    this.setState({ language })
    sessionStorage.setItem('language', language)
  }

  render() {
    const { password, loggedIn, imagesLoaded, shouldPrefillData, language } = this.state

    return (
      <TextProvider language={language}>
        <Background>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Div column itemsCenter margin="auto">
                  {!loggedIn && (
                    <TextField
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={this.changePassword}
                    />
                  )}

                  <Div listLeft={16} mTop={32}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.startFlow(1)}
                      disabled={(!loggedIn && password !== 'test') || !imagesLoaded}
                    >
                      {imagesLoaded ? 'Onboarding 1' : 'Loading...'}
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.startFlow(2)}
                      disabled={(!loggedIn && password !== 'test') || !imagesLoaded}
                    >
                      {imagesLoaded ? 'Onboarding 2' : 'Loading...'}
                    </Button>
                  </Div>

                  <Div listLeft mTop={32} itemsCenter>
                    <span>English</span>
                    <MuiSwitch checked={language === 'german'} onChange={this.changeLanguage} color="default" />
                    <span>German</span>
                  </Div>

                  <AppVersion>{VERSION}</AppVersion>
                </Div>
              )}
            />

            {/* Flow 1 */}
            <PrivateRoute path="/onboarding-1/intro" isRestricted={!loggedIn} component={IntroPage} />
            <PrivateRoute path="/onboarding-1/usp" isRestricted={!loggedIn} component={UspPage} />
            <PrivateRoute path="/onboarding-1/first-login" isRestricted={!loggedIn} component={FirstLoginPage} />

            <PrivateRoute
              path="/onboarding-1/step-1"
              isRestricted={!loggedIn}
              component={Step1Page}
              shouldPrefillData={shouldPrefillData}
            />

            <PrivateRoute path="/onboarding-1/step-2" isRestricted={!loggedIn} component={Step2Page} />
            <PrivateRoute path="/onboarding-1/step-3" isRestricted={!loggedIn} component={Step3Page} />

            {/* Flow 2 */}
            <PrivateRoute path="/onboarding-2/intro" isRestricted={!loggedIn} component={IntroPage2} />
            <PrivateRoute path="/onboarding-2/usp" isRestricted={!loggedIn} component={UspPage2} />

            {/* 404 */}
            <Redirect from="/index.html" to="/" />
            <Route component={NotFoundPage} />
          </Switch>

          {process.env.NODE_ENV === 'development' && (
            <RouteChanger
              location={this.props.location}
              history={this.props.history}
              handlePrefill={() => this.setState({ shouldPrefillData: true })}
            />
          )}
        </Background>
      </TextProvider>
    )
  }
}

export default hot(module)(App)

/* prettier-ignore */
const AppVersion = styled.span`
  position: fixed;
  bottom: 8px;
  right: 8px;
  font-size: 16px;
  color: #aaa;
  font-weight: bold;
  pointer-events: none;
`

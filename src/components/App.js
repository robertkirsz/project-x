import React, { Component } from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Div } from 'styled-kit'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import routes from 'routes'
import preloadImages from 'utils/preloadImages'
import TextProvider from 'providers/TextProvider'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiSwitch from '@material-ui/core/Switch'

import Background from 'components/Background'
import RouteChanger from 'components/RouteChanger'
import PrivateRoute from 'components/PrivateRoute'
import StepInfo from 'components/StepInfo'

// Flow 1
import IntroPage from 'pages/onboarding-1/IntroPage'
import UspPage from 'pages/onboarding-1/UspPage'
import FirstLoginPage from 'pages/onboarding-1/FirstLoginPage'
import Step1Page from 'pages/onboarding-1/Step1Page'
import Step2Page from 'pages/onboarding-1/Step2Page'
import Step3Page from 'pages/onboarding-1/Step3Page'

// Flow 2
import IntroPage2 from 'pages/onboarding-2/IntroPage'
import UspPage2 from 'pages/onboarding-2/UspPage'
import FirstLoginPage2 from 'pages/onboarding-2/FirstLoginPage'
import Step1Page2 from 'pages/onboarding-2/Step1Page'
import Step2Page2 from 'pages/onboarding-2/Step2Page'
import Step3Page2 from 'pages/onboarding-2/Step3Page'
import Step4Page2 from 'pages/onboarding-2/Step4Page'
import FinishPage2 from 'pages/onboarding-2/FinishPage'

import DashboardPage from 'pages/onboarding-2/DashboardPage'

// 404
import NotFoundPage from 'pages/NotFoundPage'

const VERSION = 'v1.0.3'

const childFactoryCreator = classNames => child => React.cloneElement(child, { classNames })

class App extends Component {
  static getDerivedStateFromProps(props, state) {
    const previousRouteIndex = state.routeIndex
    const currentRouteIndex = routes.findIndex(route => route === props.location.pathname)

    const direction =
      previousRouteIndex === currentRouteIndex
        ? state.direction
        : previousRouteIndex > currentRouteIndex
          ? 'left'
          : 'right'

    return { direction, routeIndex: currentRouteIndex }
  }

  state = {
    password: '',
    loggedIn: Boolean(sessionStorage.getItem('loggedIn')),
    imagesLoaded: false,
    language: sessionStorage.getItem('language') || 'english',
    direction: 'right',
    routeIndex: 0
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
    const { password, loggedIn, imagesLoaded, language, direction } = this.state

    return (
      <TextProvider language={language}>
        <Background>
          <Route path="/onboarding-2/" component={StepInfo} />

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

            <PrivateRoute path="/onboarding-1/step-1" isRestricted={!loggedIn} component={Step1Page} />

            <PrivateRoute path="/onboarding-1/step-2" isRestricted={!loggedIn} component={Step2Page} />
            <PrivateRoute path="/onboarding-1/step-3" isRestricted={!loggedIn} component={Step3Page} />

            {/* Flow 2 */}
            <PrivateRoute path="/onboarding-2/intro" isRestricted={!loggedIn} component={IntroPage2} />
            <PrivateRoute path="/onboarding-2/usp/:index" isRestricted={!loggedIn} component={UspPage2} />

            <TransitionGroup component={AnimationWrapper} childFactory={childFactoryCreator(`fade-${direction}`)}>
              <CSSTransition key={this.props.location.key} classNames={`fade-${direction}`} timeout={500}>
                <Switch location={this.props.location}>
                  <PrivateRoute path="/onboarding-2/first-login" isRestricted={!loggedIn} component={FirstLoginPage2} />
                  <PrivateRoute path="/onboarding-2/step-1" isRestricted={!loggedIn} component={Step1Page2} />
                  <PrivateRoute path="/onboarding-2/step-2" isRestricted={!loggedIn} component={Step2Page2} />
                  <PrivateRoute path="/onboarding-2/step-3" isRestricted={!loggedIn} component={Step3Page2} />
                  <PrivateRoute path="/onboarding-2/step-4" isRestricted={!loggedIn} component={Step4Page2} />
                  <PrivateRoute path="/onboarding-2/finish" isRestricted={!loggedIn} component={FinishPage2} />
                  <PrivateRoute path="/onboarding-2/dashboard" isRestricted={!loggedIn} component={DashboardPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>

            {/* 404 */}
            <Redirect from="/index.html" to="/" />
            <Route component={NotFoundPage} />
          </Switch>

          {process.env.NODE_ENV === 'development' && (
            <RouteChanger location={this.props.location} history={this.props.history} />
          )}
        </Background>
      </TextProvider>
    )
  }
}

export default hot(module)(App)

const AppVersion = styled.span`
  position: fixed;
  bottom: 8px;
  right: 8px;
  font-size: 16px;
  color: #aaa;
  font-weight: bold;
  pointer-events: none;
`

const AnimationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

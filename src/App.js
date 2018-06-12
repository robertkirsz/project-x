import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import IntroPage from 'pages/IntroPage'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/intro" component={IntroPage} />
        </Switch>
      </Fragment>
    )
  }
}

export default App

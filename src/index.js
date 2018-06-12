import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import 'styles'

ReactDOM.render(
  <Fragment>
    <Router>
      <Route path="/" component={App} />
    </Router>
    <CssBaseline />
  </Fragment>,
  document.getElementById('root')
)

registerServiceWorker()

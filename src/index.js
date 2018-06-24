import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import registerServiceWorker from 'utils/registerServiceWorker'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import App from 'components/App'

import 'styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#F39100',
      main: '#F39100',
      dark: '#F39100'
    }
  }
})

ReactDOM.render(
  <Fragment>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </MuiThemeProvider>
    <CssBaseline />
  </Fragment>,
  document.getElementById('root')
)

registerServiceWorker()

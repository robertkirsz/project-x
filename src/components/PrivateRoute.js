import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, isRestricted, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isRestricted ? (
        <Component {...props} shouldPrefillData={rest.shouldPrefillData} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

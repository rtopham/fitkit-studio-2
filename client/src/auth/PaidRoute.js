import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const PaidRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticatedAndPaid() ? (
      <Component {...props}/>
    ) : auth.isAuthenticated() ? (
      <Redirect to={{
        pathname: `/user/account/upgradenotice/${auth.isAuthenticated().user._id}`,
        state: { from: props.location }
      }}/>
    ) :(
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PaidRoute

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticatedAndAdmin() ? (
      <Component {...props}/>
    ) : auth.isAuthenticated() ? (
      <Redirect to={{
        pathname: `/admin/error`,
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

export default AdminRoute

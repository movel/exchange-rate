import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const ProtectedRoute: React.ComponentType<any> = ({
  component: Component,
  ...rest
}) => {
    const { isAuthenticated } = rest
    return (<Route {...rest} render={props => {
      if (isAuthenticated) {
        return <Component {...props} />
      }
      else {
        return (<Redirect to={{
          pathname: "/",
          state: {
            from: props.location
          }
        }} />)
      }
    } } />)
  }
  
function mapStateToProps(state: { auth: { token: any; }; }) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
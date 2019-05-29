import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import auth from '../components/Auth/Auth'

const Login = (props: RouteComponentProps) => {
  return (
    <>
      <h1>Login</h1>
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push("/profile")
          })
        }}
      >
        Login
      </button>
    </>
  )
}

export default Login
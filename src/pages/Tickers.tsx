import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import auth from '../components/Auth/Auth'

const Tickers = (props: RouteComponentProps) => {
  return (
    <>
      <h1>Tickers</h1>
      <button onClick={() => {
        auth.logout(() => {
          props.history.push("/");
        });
      } }>
        Logout
      </button>
      <br />
      <img src="https://foter.com/photos/394/portrait-of-three-dogs-on-dirt-road.jpg" alt="dogs" />
    </>
  )
}

export default Tickers
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import auth from '../components/Auth/Auth'

const Profile = (props: RouteComponentProps) => {
  return (
    <>
      <h1>Profile</h1>
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

export default connect()(Profile)
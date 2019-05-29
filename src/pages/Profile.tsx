import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import auth from '../components/Auth/Auth'

const Profile = (props: RouteComponentProps) => {
  return (<>
    <h1>Profile</h1>
    <button onClick={() => {
      auth.logout(() => {
        props.history.push("/");
      });
    } }>
      Logout
    </button>
  </>);
}

export default Profile
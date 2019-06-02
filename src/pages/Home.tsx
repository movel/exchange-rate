import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = (props: RouteComponentProps) => {
  return (
    <>
      <h1>Home</h1>
      <img src="https://foter.com/photos/398/planked-dog-lying-canines.jpg" alt="dog" />
    </>
  )
}

export default connect()(Home)
import React from 'react'
// import { RouteComponentProps } from 'react-router-dom'
// import { connect } from 'react-redux'

import { useTheme } from '../themes/ThemeContext';
import styled, { withTheme } from 'styled-components';
import { buttonBackgroundColor, buttonTextColor } from '../themes/theme'

const Button = styled.button`
    background: ${buttonBackgroundColor};
    border: none;
    border-radius: 0.3em;
    box-shadow: none;
    color: ${buttonTextColor};
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em 1em;
  `;

const Home = (props: any) => {
  const themeToggle = useTheme()

  return (
    <>
      <h1>Home</h1>
      <img src="https://foter.com/photos/398/planked-dog-lying-canines.jpg" alt="dog" />
      <p>
        <Button onClick={() => themeToggle.toggle()}>
          {props.theme.mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </p>
    </>
  )
}

export default withTheme(Home)
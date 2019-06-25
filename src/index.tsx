import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { MyThemeProvider, } from "../src/themes/ThemeContext"

const render = () => {
  ReactDOM.render(
    <AppContainer>
        <MyThemeProvider>
          <App />
        </MyThemeProvider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
  );
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

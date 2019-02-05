import React, { Component } from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'
import * as constants from '../env'
import Home from './components/Home/Home'
import About from './components/About/About'
import './App.sass'
import Tickers from './components/Tickers/Tickers'

const GOOGLE_CLIENT_API = constants.REACT_APP_GOOGLE_CLIENT_ID.value
class App extends Component {
  state = {
    isLoggedIn: true,
    name: null,
    imgUrl: null,
  }

  componentDidMount() {
    const _onInit = auth2 => {
      console.log('init OK', auth2)
    }
    const _onError = err => {
      console.log('error', err)
    }
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({ // не забудьте указать ваш ключ в .env
          client_id:
            // process.env.REACT_APP_GOOGLE_CLIENT_ID,
            { GOOGLE_CLIENT_API }
        })
        .then(_onInit, _onError)
    })
  }

  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {
    
      // метод возвращает объект пользователя
      // где есть все необходимые нам поля
      const profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId()) // не посылайте подобную информацию напрямую, на ваш сервер!
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // токен
      const id_token = googleUser.getAuthResponse().id_token
      console.log('ID Token: ' + id_token)
    })
  }
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function() {
      console.log('User signed out.')
    })
  }

  render() {
    const { name, imgUrl } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <h2>Currency Exchange Rate</h2>
          <nav className="nav">
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName={'wfm-active'}
                >Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeStyle={{
                  color: 'blue'
                }}>About</NavLink>
              </li>
              <li>
                <NavLink to={{
                  pathname: '/tickers/'
                }}>Tickers</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/*localhost:3000*/}
        <Switch>
          <Route path="/" exact component={Home} />

          { this.state.isLoggedIn ? <Route path="/about" component={About}/> : null }

          <Route path="/tickers" component={Tickers}/>
          <Redirect to={'/'}/>
        </Switch>

        {/* <Tickers /> */}
      </div>
    );
  }
}

export default App
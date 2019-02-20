import React, { Component } from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'
import * as constants from '../env'
import Home from './components/Home/Home'
import About from './components/About/About'
import './App.sass'
import Tickers from './components/Tickers/Tickers'

class App extends Component {
  state = {
    isLoggedIn: true,
    name: null,
    imgUrl: null,
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
                  activeStyle={{
                    color: 'white'
                  }}
                >Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" 
                  activeStyle={{
                    color: 'white'
                }}
                >About</NavLink>
              </li>
              <li>
                <NavLink to={{
                    pathname: '/tickers/'
                  }}
                  activeStyle={{
                    color: 'white'
                  }}
                >Tickers</NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/*localhost:3000*/}
        <Switch>
          <Route path="/" exact component={Home} />

          { this.state.isLoggedIn ? <Route path="/about" component={About} /> : null }

          <Route path="/tickers" component={Tickers}/>
          <Redirect to={'/'}/>
        </Switch>
      </div>
    );
  }
}

export default App
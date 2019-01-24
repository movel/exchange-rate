import React, { Component } from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'
import About from './components/About/About'
import './App.sass'
import Tickers from './components/Tickers/Tickers'

class App extends Component {
  state = {
    isLoggedIn: true
  }

  componentDidMount() {
    console.log('process.env.VERSION', process.env.VERSION);
    console.log('process.env.PLATFORM', process.env.PLATFORM);
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  }

  render() {
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
          <Route path="/" exact render={() => <h1>Home Page</h1>}/>

          { this.state.isLoggedIn ? <Route path="/about" component={About}/> : null }

          <Route path="/tickers" component={Tickers}/>
          <Redirect to={'/'}/>
          {/*<Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} />*/}
        </Switch>

        {/* <Tickers /> */}
      </div>
    );
  }
}

export default App
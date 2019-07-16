import React, { lazy } from 'react'
import { Route, Switch } from 'react-router'
import { ProtectedRoute } from '../pages/ProtectedRoute'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Login = lazy(() => import('../pages/Login'))
const Tickers = lazy(() => import('../pages/Tickers/Tickers'))

const PageNotFound = lazy(() => import('../components/PageNotFound/PageNotFound'))

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Home} />
    <ProtectedRoute exact path="/tickers" component={Tickers} />
    <Route component={PageNotFound} />
  </Switch>
)

export default routes
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from '../src/components/Menu/Menu'
import './App.css';

const Home = lazy(() => import('../src/routes/Home'));
const About = lazy(() => import('../src/routes/About'));
const Login = lazy(() => import('../src/routes/Login'));
const Profile = lazy(() => import('../src/routes/Profile'));

const PageNotFound = lazy(() => import('../src/components/PageNotFound/PageNotFound'))

const App = () => {
  return (
    <div className="Login">
      <Menu />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/home" component={About} />
            <Route path="/login" component={Login} />
            {/* <PrivateRoute path="/profile" component={ Profile } />  */}
            <Route component={Profile} />
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

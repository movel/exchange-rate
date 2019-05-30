import React from 'react';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';
import auth from '../Auth/Auth'
import './Menu.sass'

const goTo = (route: string, props: RouteComponentProps) => {
  props.history.replace(`/${route}`)
}

const Menu = (props: RouteComponentProps) => {

    return (
      <nav className="menu">
        <ul>
          <li>
            <NavLink to="/home"
              className="button__menu"
              onClick={() => goTo('home', props)}
            >
              На главную
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile"
              className="button__menu"
              onClick={() => goTo('profile', props)}
            >
              Профиль  
            </NavLink>
          </li>
          {
            !auth.isAuthenticated() && (
              <li>
                <NavLink to="/login"
                  className="button__menu"
                  onClick={() => goTo('login', props)}
                >
                  Log In
                </NavLink>
              </li>
            )
          }
          {
            auth.isAuthenticated() && (
              <li>  
                <NavLink to="/logout"
                  className="button__menu"
                  onClick={() => {
                  auth.logout(() => {
                    goTo('logout', props);
                  });
                } }>
                  Log Out
                </NavLink>
              </li>  
            )
          }
          
        </ul>
      </nav>
    );
  
}

export default withRouter(Menu);
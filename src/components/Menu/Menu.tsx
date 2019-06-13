import React from 'react'
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom'
import auth from '../Auth/Auth'
import './Menu.sass'

import styled, { withTheme } from 'styled-components'
import { backgroundColor, textColor } from '../../themes/theme'

const StyledNavLink = styled(NavLink)`
    background: ${backgroundColor};
    color: ${textColor};
  `;

const StyledNav = styled.nav`
  background: ${backgroundColor};
  color: ${textColor};
  `;

const goTo = (route: string, props: RouteComponentProps) => {
  props.history.replace(`/${route}`)
}

const Menu = (props: RouteComponentProps) => {

    return (
      <StyledNav className="menu">
        <ul>
          <li>
            <StyledNavLink to="/home"
              className="button__menu"
              onClick={() => goTo('home', props)}
              defaultChecked
            >
              На главную
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile"
              className="button__menu"
              onClick={() => goTo('profile', props)}
            >
              Профиль  
            </StyledNavLink>
          </li>
          {
            !auth.isAuthenticated() && (
              <li>
                <StyledNavLink to="/login"
                  className="button__menu"
                  onClick={() => goTo('login', props)}
                >
                  Log In
                </StyledNavLink>
              </li>
            )
          }
          {
            auth.isAuthenticated() && (
              <li>  
                <StyledNavLink to="/logout"
                  className="button__menu"
                  onClick={() => {
                    auth.logout(() => {
                      goTo('logout', props);
                    });
                  }}>
                  Log Out
                </StyledNavLink>
              </li>  
            )
          }
          
        </ul>
      </StyledNav>
    );
  
}

export default withTheme(withRouter(Menu))
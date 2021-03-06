import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom'
import { logout, autoLogin } from '../../store/actions/auth'
import { clearSelectedData } from '../../store/actions/selected'
import { clearAllConfigs } from '../../store/actions/config'
import './Menu.sass'

import styled, { withTheme } from 'styled-components'
import { backgroundColorBody, backgroundColor, textColor } from '../../themes/theme'

const StyledNavLink = styled(NavLink)`
    background: ${backgroundColor};
    color: ${textColor};
  `;

const StyledNav = styled.nav`
  background: ${backgroundColorBody};
  color: ${textColor};
  `;

const goTo = (route: string, props: RouteComponentProps) => {
  props.history.replace(`/${route}`)
}

const Menu = (props: any) => {

  useEffect(() => {
    if(!props.isAuthenticated) {
      props.autoLogin()
    }
    
  }, [props])

    return (
      <StyledNav className="menu">
        <ul>
          <li>
            <StyledNavLink to="/home"
              className="button__menu"
              onClick={() => goTo('home', props)}
              defaultChecked
            >
              Home
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/tickers"
              className="button__menu"
              onClick={() => goTo('tickers', props)}
            >
              Tickers  
            </StyledNavLink>
          </li>
          {
            !props.isAuthenticated && (
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
            props.isAuthenticated && (
              <li>  
                <StyledNavLink to="/logout"
                  className="button__menu"
                  onClick={() => {
                    props.logout(() => {
                      goTo('logout', props)
                    })
                    props.clearSelectedData()
                    props.clearAllConfigs()
                  }}>
                  Log Out
                </StyledNavLink>
              </li>  
            )
          }
          <li>
            <StyledNavLink to="/about"
              className="button__menu"
              onClick={() => goTo('about', props)}
            >
              About  
            </StyledNavLink>
          </li>
        </ul>
      </StyledNav>
    );
  
}

function mapStateToProps(state: { auth: { token: any; }; }) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch: (arg0: any) => void) {
  return {
    logout: () => dispatch(logout()),
    autoLogin: () => dispatch(autoLogin()),
    clearSelectedData: () => dispatch(clearSelectedData()),
    clearAllConfigs: () => dispatch(clearAllConfigs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withRouter(Menu)))
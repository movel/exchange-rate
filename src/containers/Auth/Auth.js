import React, { PureComponent } from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'

class Auth extends PureComponent {
  loginHandler = () => {

  }

  registerHandler = () => {
    
  }

  submitHandler = event => {
    event.preventDefault()
  }

  render() {
    return (
      <div className={ classes.Auth }>
        <div>
          <h1>Authorisation</h1>

          <form onSubmit={ this.submitHandler } className={ classes.AuthForm }>
            <input type="text" />
            <input type="text" />

            <Button 
              type="success" 
              onClick={ this.loginHandler}
            >
              Log in
            </Button>
            <Button 
              type="primary" 
              onClick={ this.registerHandler}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
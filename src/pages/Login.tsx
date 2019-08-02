import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import auth from '../components/Auth/Auth'
import { loginAuth } from '../store/actions/auth'

const initialFormControls = 
  {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Enter a valid email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Enter the correct password',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }

const validateEmail = (email: any) => {
  // eslint-disable-next-line
  let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regexp.test(String(email).toLowerCase())
}

const Login = (props: any) => {

  const [isFormValid, setIsFormValid] = useState(false)
  const [formControls, setFormControls] = useState(initialFormControls)

  const loginHandler = () => {
    props.loginAuth(
      formControls.email.value,
      formControls.password.value,
      true
    )

    // if(props.data.registered) {
    //   auth.login(() => {
    //     props.history.push('/tickers')
    //   })
    // }

    // const api = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + REACT_API_GOOGLE_WEB_API_KEY

    // try {
    //   const response = await axios.post(api, authData)
    //   if(response.data.registered) {
    //     auth.login(() => {
    //       props.history.push('/tickers')
    //     })
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }

  const registerHandler = () => {
    props.loginAuth(
      formControls.email.value,
      formControls.password.value,
      false
    )

    // const api = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + REACT_API_GOOGLE_WEB_API_KEY

    // try {
    //   const response = await axios.post(api, authData)

      
    // } catch (e) {
    //   console.log(e)
    // }
  }


  const onChangeHandler = (event: { target: { value: any; }; }, controlName: string) => {
    const formControlsTmp: any = { ...formControls }
    const control = { ...formControlsTmp[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControlsTmp[controlName] = control

    let isFormValid = true

    Object.keys(formControlsTmp).forEach(name => {
      isFormValid = formControlsTmp[name].valid && isFormValid
    })

    setFormControls(formControlsTmp)
    setIsFormValid(isFormValid)
  }

  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
  }

  const validateControl = (value: { trim: () => string; length: number; }, validation: { required: any; email: any; minLength: number; }) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const renderInputs = () => {
    const formControlsTmp: any = formControls
    return Object.keys(formControlsTmp).map((controlName, index) => {
      const control: any = formControlsTmp[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event: any) => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
      
      <div>
        {
          !auth.isAuthenticated() && (
            <>
              <h2>Login</h2>
              <form onSubmit={submitHandler}>

                { renderInputs() }

                <Button
                  type="success"
                  onClick={loginHandler}
                  disabled={!isFormValid}
                >
                  LogIn
                </Button>

                <Button
                  type="primary"
                  onClick={registerHandler}
                  disabled={!isFormValid}
                >
                  Register
                </Button>

              </form>
            </>
          )
        }        
      </div>    
  )
}

function mapDispatchToProps(dispatch: (arg0: any) => void) {
  return {
    loginAuth: (email: string, password: string, isLogin: boolean) => dispatch(loginAuth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Login)
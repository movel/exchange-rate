import React, { useState } from 'react'
import { connect } from 'react-redux'
import Form from '../components/UI/Form/Form'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import { loginAuth } from '../store/actions/auth'
import { postGoogleFirebase } from '../store/actions/config'

const initialFormControls = 
  {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
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
      placeholder: 'Enter Password',
      errorMessage: 'Enter the correct password at least 6 signs',
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
    .then(() => props.history.push('/tickers'))
    .catch((error: any) => {throw(error)})
  }

  const registerHandler = () => {
    props.loginAuth(
      formControls.email.value,
      formControls.password.value,
      false
    )
    .then(() => props.history.push('/tickers'))
    .then(() => props.postGoogleFirebase({userId: props.userId})) //create config data for user in db
    .catch((error: any) => {throw(error)})
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
          placeholder={control.placeholder}
          errorMessage={control.errorMessage}
          onChange={(event: any) => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  let h2Style = {
    color: '#ffffff'
  };

  return (
      <div>
        {
          !props.isAuthenticated && (
            <>
              <h2 style={h2Style}>Log in</h2>
              <Form onSubmit={submitHandler}>

                { renderInputs() }

                <hr />

                <div className="clearfix">
                  <Button
                    type="submit success"
                    onClick={loginHandler}
                    disabled={!isFormValid}
                  >
                    Log in
                  </Button>

                  <Button
                    type="primary"
                    onClick={registerHandler}
                    disabled={!isFormValid}
                  >
                    Register
                  </Button>
                </div>

              </Form>
            </>
          )
        }        
      </div>    
  )
}

function mapStateToProps(state: { auth: { token: any; userId: string }; }) {
  return {
    isAuthenticated: !!state.auth.token,
    userId: state.auth.userId,
  }
}

function mapDispatchToProps(dispatch: (arg0: any) => void) {
  return {
    loginAuth: (email: string, password: string, isLogin: boolean) => dispatch(loginAuth(email, password, isLogin)),
    postGoogleFirebase: (data: []) => dispatch(postGoogleFirebase(data)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
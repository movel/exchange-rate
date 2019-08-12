import React from 'react'
import './Input.css'

const isInvalid = (props: any) => {
  return !props.valid && props.shouldValidate && props.touched
}

const Input = (props: { valid: any; touched: any; shouldValidate: any; type: any; label: any; value?: any; onChange?: any; placeholder?: any; errorMessage?: any; }) => {
  const inputType = props.type || 'text'
  const cls = ['Input']
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push('invalid')
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Enter correct value'}</span>
          : null
      }
    </div>
  )
}

export default Input
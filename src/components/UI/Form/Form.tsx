import React from 'react'
import './Form.css'

const Form = (props: { onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined; children: React.ReactNode; }) => {
  const cls = [
    'Form'
  ]

  return (
    <form
      onSubmit={props.onSubmit}
      className={cls.join(' ')}
    >
      {props.children}
    </form>
  )
}

export default Form
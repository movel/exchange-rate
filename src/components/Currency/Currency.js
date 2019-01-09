import React from 'react'
import classes from './Currency.module.css'

const Currency = props => {
  const {
    name,
    value
  } = props

  return (
    <ul>
        <li className={`${classes.currency}`}>
        <p className="currency__name">{ name } - { (+value).toFixed(2) }</p>
      </li>
    </ul>
  )
}

export default Currency
import React from 'react'
import classes from './Currency.module.css'

const Currency = props => {
  const {
    selected
  } = props

  const tickersCurrency = selected.map((currency) =>
    <li className={`${classes.currency}`}>
      <p className="currency__name">{ currency.label } - { (+props.dataCurrency[currency.label]).toFixed(2) }</p>
    </li>
  )

  return (
    <ul className={`${classes.currency__ul}`}>
      { tickersCurrency }
    </ul>
  )
}

export default Currency
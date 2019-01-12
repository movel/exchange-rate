import React from 'react'
import classes from './Currency.module.css'
import * as constants from '../../countries'

const Currency = props => {
  const {
    dataCurrency,
    dataDescription
  } = props.state

  const {
    selected
  } = props

  const tickersCurrency = selected.map((currency, index) =>
    <li className={`${classes.currency}`} key={ index }>
      <div className={`${classes.currency__img}`}>
        <img src={`https://www.countryflags.io/${constants.countries[currency.label]}/shiny/64.png`} alt="flag"></img>
      </div>
      <p className={`${classes.currency__name}`}>
        { currency.label } - { (+dataCurrency[currency.label]).toFixed(2) }
      </p>
    </li>
  )

  return (
    <ul className={`${classes.currency__ul}`}>
      { tickersCurrency }
    </ul>
  )
}

export default Currency
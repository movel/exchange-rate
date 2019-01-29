import React from 'react'
import shortid from 'shortid'
import './Currency.sass'
import * as constants from '../../options'

const Currency = props => {
  const {
    dataCurrency
  } = props.state

  const {
    selected
  } = props

  const flagCountry = '<img src={`https://www.countryflags.io/${constants.countries[currency.label]}/shiny/64.png`} alt="flag"></img>'

  const tickersCurrency = selected.map( currency =>
    <li className="currency" key={ shortid.generate() } title={ constants.currencies[currency.label] }>
      <div className="currency__img">
        { 
          constants.countries[currency.label] === 'EU'
          ? <img src="/dist/images/EU_small.png" alt="flag EU" />
          : <img src={`http://flagpedia.net/data/flags/small/${constants.countries[currency.label].toLowerCase()}.png`} alt="flag" />
        }
      </div>
      <p className="currency__name">
        { currency.label } - { (+dataCurrency[currency.label]).toFixed(2) }
      </p>
    </li>
  )

  return (
    <ul className="currency__ul">
      { tickersCurrency }
    </ul>
  )
}

export default Currency
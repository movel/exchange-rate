import React from 'react'
import shortid from 'shortid'
import './Currency.sass'
import * as constants from '../../options'

const Currency = (props: { selected?: any; state?: any; }) => {
  const {
    dataCurrency
  } = props.state

  const {
    selected
  } = props

  // const flagCountry = '<img src={`https://www.countryflags.io/${constants.countries[currency.label]}/shiny/64.png`} alt="flag"></img>'

  const tickersCurrency: any = selected.map( (currency: { title: string | undefined; label: string | any; }) =>
    {
      const flagName = String(constants.countries[currency.label]).toLowerCase()
      const imgFlag = <img src={`http://flagpedia.net/data/flags/small/${flagName}.png`} alt="flag" />
      return (
      <li className="currency" key={ shortid.generate() } title={ currency.title }>
        <div className="currency__img">
          { 
            imgFlag
          }
        </div>
        <p className="currency__name">
          { currency.label } - { (+dataCurrency[`USD${currency.label}`]).toFixed(2) }
        </p>
      </li>
      )
    } 
  )

  return (
    <ul className="currency__ul">
      { tickersCurrency }
    </ul>
  )
}

export default Currency
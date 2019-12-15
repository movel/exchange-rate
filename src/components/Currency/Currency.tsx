import React, { useContext } from 'react'
import shortid from 'shortid'
import { dataCurrencyContext } from '../../containers/CurrenciesContainer/CurrenciesContainer'
import './Currency.sass'
import * as constants from '../../options'
import { selectedContext } from '../../pages/Tickers/Tickers';

const Currency = () => {
  let selected = useContext(selectedContext)

  if(selected === null) selected = []

  const dataCurrency: any = useContext(dataCurrencyContext)

  // const flagCountry = '<img src={`https://www.countryflags.io/${constants.countries[currency.label]}/shiny/64.png`} alt="flag"></img>'

  const tickersCurrency: any = selected.map( (currency: { title: string | undefined; label: string | any; value: string | any; }) =>
    {
      let a: {value: string, label: string} = { value: '', label: ''}
      let b = constants.countries.find(elem => {
        return elem.value === currency.value
      })

      if(b !== undefined) a = b
        
      const flagName = String(a.label).toLowerCase()
      
      let imgFlag
      
      if(flagName === 'eu') imgFlag = <img src="/img/eu.jpg" alt="flag" />
        else imgFlag = <img src={`http://flagpedia.net/data/flags/small/${flagName}.png`} alt="flag" />
      

      return (
        <li className="currency" key={ shortid.generate() } title={ currency.title }>
          <div className="currency__img">
            { 
              imgFlag
            }
          </div>
          <div className="currency__name">
            { currency.label } - { (+dataCurrency[`USD${currency.label}`]).toFixed(2) }
          </div>
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
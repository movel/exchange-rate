import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Currency from '../../components/Currency/Currency'
import './CurrenciesContainer.sass'
import { selectedContext } from '../../pages/Tickers/Tickers'
import { createContext } from 'react'
import * as constants from '../../options'

import shortid from 'shortid'

const dataCurrencyContext = createContext([])

const CurrenciesContainer = () => {
  // const [dataCurrency, setDataCurrency] = useState({USDJPY: 108.45183333,})

  // useEffect(() => {
  //   fetchCurrencyData()
  // })

  // const fetchCurrencyData = () => {
  //   const APP_ID = process.env.REACT_API_CURRENCY_LAYER_COM

  //   let apiTimeSeries = `http://apilayer.net/api/live?access_key=${APP_ID}`
  //   apiTimeSeries += '&source=USD&format=1'

  //   axios.get(apiTimeSeries.trim())
  //     .then(response => {
  //       const dataCurrency = response.data.quotes
  //       setDataCurrency(dataCurrency)
  //     })
  //     .catch(err => console.log(err))
  // }

  // const fetchCurrenciesDescription = () => {
  //   const api = 'https://openexchangerates.org/api/currencies.json'

  //   axios.get(api)
  //     .then(response => {
  //       const dataDescription = response.data
  //       setDataDescription(dataDescription)
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
        <selectedContext.Consumer>
          {selected => (
            // <Currency selected={selected} />
            selected.map( (currency: { title: string | undefined; label: string | any; value: string | any; }) =>
              {
                

                let a: {value: String, label: String} = { value: '', label: ''}
                let b = constants.countries.find(elem => {
                  return elem.value === currency.value
                })

                if(b !== undefined) a = b
                  
                const flagName = String(a.label).toLowerCase()
                
                const imgFlag = <img src={`http://flagpedia.net/data/flags/small/${flagName}.png`} alt="flag" />
                return (
                  
                      
                        <li className="currency" key={ shortid.generate() } title={ currency.title }>
                          <div className="currency__img">
                            { 
                              imgFlag
                            }
                          </div>
                          {/* <p className="currency__name">
                            { currency.label } - { (+dataCurrency[`USD${currency.label}`]).toFixed(2) }
                          </p> */}
                        </li>
                      
                )
              }
          ))}
        </selectedContext.Consumer>
  )
}

export default CurrenciesContainer

export { dataCurrencyContext }
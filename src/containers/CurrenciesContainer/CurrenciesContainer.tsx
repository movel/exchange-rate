import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Currency from '../../components/Currency/Currency'
import './CurrenciesContainer.sass'
import { createContext } from 'react'
import { REACT_API_CURRENCY_LAYER_COM } from '../../env.local'

const dataCurrencyContext = createContext({})

const CurrenciesContainer = () => {
  const [dataCurrency, setDataCurrency] = useState({USDJPY: 108.45183333,})

  useEffect(() => {
    fetchCurrencyData()
  },[])

  const fetchCurrencyData = () => {
    const APP_ID = REACT_API_CURRENCY_LAYER_COM

    let apiTimeSeries = `http://apilayer.net/api/live?access_key=${APP_ID}`
    apiTimeSeries += '&source=USD&format=1'

    axios.get(apiTimeSeries.trim())
      .then(response => {
        const dataCurrency = response.data.quotes
        setDataCurrency(dataCurrency)
      })
      .catch(err => console.log(err))
  }

  return (
    <dataCurrencyContext.Provider value={dataCurrency}>
      <Currency />
    </dataCurrencyContext.Provider>
  )
}

export default CurrenciesContainer

export { dataCurrencyContext }
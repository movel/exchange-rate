import React, { PureComponent } from 'react'
import axios from 'axios'
import Currency from '../../components/Currency/Currency'
import './CurrenciesContainer.sass'
import * as constants from '../../../env'

class CurrenciesContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      dataCurrency: {
        "JPY": 108.45183333,
      },
      dataDescription: {
        "JPY": '',
      },
    }
  }

  componentDidMount() {
    this.fetchCurrencyData()
    this.fetchCurrenciesDescription()
    // this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCurrencyData() {
    // const APP_ID = process.env.REACT_APP_OPENEXCHANGERATES_ORG_ID

    const APP_ID = constants.REACT_API.value

    // const api = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`

    // axios.get(api)
    //   .then(response => {
    //     const dataCurrency = response.data.rates
    //     this.setState({
    //       dataCurrency
    //     })
    //   })
    //   .catch(err => console.log(err))

    let apiTimeSeries = `https://openexchangerates.org/api/time-series.json?app_id=${APP_ID}`
    apiTimeSeries += '&start=2019-01-01&end=2019-01-10&base=USD&symbols=RUB,EUR,HKD,prettyprint=1'
    
    console.log('apitimes', apiTimeSeries)
    
    axios.get(apiTimeSeries.trim())
      .then(response => {
        const dataCurrency = response.data.rates
        console.log('apiTimesSeries', dataCurrency)
      })
      .catch(err => console.log(err))
  }

  fetchCurrenciesDescription() {
    const api = 'https://openexchangerates.org/api/currencies.json'

    axios.get(api)
      .then(response => {
        const dataDescription = response.data
        this.setState({
          dataDescription
        })
      })
      .catch(err => console.log(err))
  }
  
  render() {
    const { selected } = this.props

    return (
      <Currency selected={ selected } state={ this.state } />
    )
  }
}

export default CurrenciesContainer
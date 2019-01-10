import React, { PureComponent } from 'react'
import axios from 'axios'
import Currency from '../../components/Currency/Currency'

class CurrenciesContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      dataCurrency: {
        "JPY": 108.45183333,
      },
    }
  }

  componentDidMount() {
    this.fetchCurrencyData()
    // this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCurrencyData() {
    const APP_ID = process.env.REACT_APP_OPENEXCHANGERATES_ORG_ID
    console.log('api', APP_ID)
    const api = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`
    
    axios.get(api)
      .then(response => {
        const dataCurrency = response.data.rates
        this.setState({ dataCurrency })
      })
      .catch(err => console.log(err))
    }

  render() {
    const { selected } = this.props

    return (
      <Currency selected={ selected } dataCurrency={ this.state.dataCurrency }/>
    )
  }
}

export default CurrenciesContainer
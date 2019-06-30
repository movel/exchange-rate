import React, {
  PureComponent
} from 'react'
import axios from 'axios'
import Currency from '../../components/Currency/Currency'
import './CurrenciesContainer.sass'
import * as constants from '../../../.env'

class CurrenciesContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      dataCurrency: {
        USDJPY: 108.45183333,
      },
      dataDescription: {
        "JPY": '',
      },
    }
  }

  componentDidMount() {
    this.fetchCurrencyData()
    // this.fetchCurrenciesDescription()
    // this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCurrencyData() {
    const APP_ID = constants.REACT_API_CURRENCY_LAYER_COM.value

    let apiTimeSeries = `http://apilayer.net/api/live?access_key=${APP_ID}`
    apiTimeSeries += '&source=USD&format=1'

    axios.get(apiTimeSeries.trim())
      .then(response => {
        const dataCurrency = response.data.quotes
        this.setState({
          dataCurrency
        })
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
    const {
      selected
    } = this.props

    return (<Currency selected={selected} state={this.state} />
    )
  }
}

export default CurrenciesContainer
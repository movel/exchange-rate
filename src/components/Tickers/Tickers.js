import React, { PureComponent } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency'
import Currency from '../Currency/Currency'
import classes from './Tickers.module.css'
import * as constants from '../../options'

class Tickers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
          {
              id: "bitcoin",
              name: "Bitcoin",
              symbol: "BTC",
              price_usd: "1",
              percent_change_1h: "0",
              percent_change_24h: "0",
              percent_change_7d: "0",
          },
          {
              id: "ethereum",
              name: "Ethereum",
              symbol: "ETH",
              price_usd: "1",
              percent_change_1h: "0",
              percent_change_24h: "0",
              percent_change_7d: "0",
          },
          {
              id: "litecoin",
              name: "Litecoin",
              symbol: "LTC",
              price_usd: "1",
              percent_change_1h: "0",
              percent_change_24h: "0",
              percent_change_7d: "0",
          }
      ],
      dataCurrency: {
        "JPY": 108.45183333,
      },
      selectedOption: [{
        "value": "JPY",
        "label": "JPY"
      }],
  }
  }

  componentDidMount() {
    this.fetchCryptocurrencyData()
    this.fetchCurrencyData()
    // this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCryptocurrencyData() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => {
        const wanted = ["bitcoin", "ethereum", "litecoin"]
        const result = response.data.filter(currency => wanted.includes(currency.id))
        this.setState({ dataCurrency: result })
      })
      .catch(err => console.log(err))
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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state

    const tickers = this.state.data.map((currency) =>
      <Cryptocurrency data={currency} key={currency.id} />
    )

    const tickersCurrency = selectedOption.map((currency, index) =>
      <Currency value={this.state.dataCurrency[currency.label]} name={currency.label} key={index} />
    )   

    return (
      <div className={ classes.tickers__container }>
        <ul className={ classes.tickers }>{ tickers }</ul>
        <br />
        <ul>{ tickersCurrency }</ul>
        <div className={ classes.select }>
          <Select
            value={ selectedOption }
            onChange={ this.handleChange }
            isMulti
            options={ constants.options }
          />
        </div>
        
        <p>Information updated every minute courtesy of <a href="http://www.coinmarketcap.com" target="_blank" rel="noopener noreferrer">coinmarketcap.com</a></p>
      </div>
    );
  }
}

export default Tickers;
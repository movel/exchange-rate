import React, { PureComponent } from 'react';
import axios from 'axios'
import Select from 'react-select'
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency'
import Currency from '../Currency/Currency'
import classes from './Tickers.module.css'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

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
      dataCurrency: [],
      selectedOption: null,
  };
  }

  componentDidMount() {
    // this.fetchCryptocurrencyData();
    this.fetchCurrencyData()
    // this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCryptocurrencyData() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => {
        const wanted = ["bitcoin", "ethereum", "litecoin"];
        const result = response.data.filter(currency => wanted.includes(currency.id));
        this.setState({ data: result });
      })
      .catch(err => console.log(err));
    } 

  fetchCurrencyData() {
    const YOUR_APP_ID = process.env.REACT_APP_ID
    console.log('api', YOUR_APP_ID)
    const api = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_ID}`
    
    axios.get(api)
      .then(response => {
        const wanted = ["RUB", "UAH"];
        const result = Object.keys(response.data.rates).map(function(key) {
          return [{name: key}, {price_usd: response.data.rates[key]}];
        });
        const res = result.filter(currency => {
          return wanted.includes(currency)
        })
        console.log('result', result)
        console.log('res', res)
        this.setState({ dataCurrency: response.data.rates });
      })
      .catch(err => console.log(err));
    }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state

    const tickers = this.state.data.map((currency) =>
      <Cryptocurrency data={currency} key={currency.id} />
    )
    console.log('datac', this.state.dataCurrency)
    // const tickersCurrency = this.state.dataCurrency.map((currency, index) =>
    //   {
    //     // console.log('tickersCurr', currency[1])
    //     return <Currency dataCurrency={currency} key={index} />
    //   }
    // )
    return (
      <div className={classes.tickers__container}>
        <ul className={classes.tickers}>{tickers}</ul>
        <br />
        <p>print env secret to HTML</p>
        <h1>{process.env.REACT_APP_ID}</h1>
        <div className={ classes.select }>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            isMulti
            options={options}
          />
        </div>
        
        <p>Information updated every minute courtesy of <a href="http://www.coinmarketcap.com" target="_blank" rel="noopener noreferrer">coinmarketcap.com</a></p>
      </div>
    );
  }
}

export default Tickers;
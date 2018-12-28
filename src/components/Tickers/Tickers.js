import React, { PureComponent } from 'react';
import axios from 'axios'
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency'
import Currency from '../Currency/Currency'
import classes from './Tickers.module.css'

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
      dataCurrency: [
        {
            id: "rub",
            name: "RUB",
            symbol: "RUB",
            price_usd: "1",
            percent_change_1h: "0",
            percent_change_24h: "0",
            percent_change_7d: "0",
        },
        {
            id: "uah",
            name: "UAH",
            symbol: "UAH",
            price_usd: "1",
            percent_change_1h: "0",
            percent_change_24h: "0",
            percent_change_7d: "0",
        }
      ]
  };
  }

  componentDidMount() {
    this.fetchCryptocurrencyData();
    this.fetchCurrencyData()
    this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCryptocurrencyData() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => {
        const wanted = ["bitcoin", "ethereum", "litecoin"];
        const result = response.data.filter(currency => wanted.includes(currency.id));
        // console.log('bitcoin: ', response.data)
        this.setState({ data: result });
      })
      .catch(err => console.log(err));
    } 

  fetchCurrencyData() {
    axios.get("https://openexchangerates.org/api/latest.json?app_id=1337cbc5bc7d462bb39d6e89e7bd19b2")
      .then(response => {
        const wanted = ["RUB", "UAH"];
        const rates = response.data.rates;
        // console.log('rates: ', rates)
        // const result = response.data.rates.map(currency => wanted.includes(currency.name));
        const result = wanted.map(rate =>  
          [{
            id: rate,
            name: rate,
            symbol: rate,
            price_usd: rates[rate],
            percent_change_1h: "0",
            percent_change_24h: "0",
            percent_change_7d: "0"
          }]
        )
        // console.log('currency: ', result);
        this.setState({ dataCurrency: result });
        console.log('dataCurrency.state', this.state.dataCurrency);
        console.log('data.state', this.state.data);
      })
      .catch(err => console.log(err));
    }

  render() {
    const tickers = this.state.data.map((currency) =>
      <Cryptocurrency data={currency} key={currency.id} />
    )
    const tickersC = this.state.dataCurrency.map((currency) => 
      {
        // console.log(currency)
        return <Currency dataCurrency={currency} key={currency.id} />
      }
    )
    return (
      <div className={classes.tickers__container}>
        <ul className={classes.tickers}>{tickers}</ul>
        <ul className={classes.tickersC}>{tickersC}</ul>
        <p>Information updated every minute courtesy of <a href="http://www.coinmarketcap.com" target="_blank" rel="noopener noreferrer">coinmarketcap.com</a></p>
      </div>
    );
  }
}

export default Tickers;
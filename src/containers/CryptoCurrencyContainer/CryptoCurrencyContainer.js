import React, { PureComponent } from 'react'
import axios from 'axios'
import Cryptocurrency from '../../components/Cryptocurrency/Cryptocurrency'

class CryptoCurrencyContainer extends PureComponent {
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
    }
  }

  componentDidMount() {
    this.fetchCryptocurrencyData()
    // this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
  }

  fetchCryptocurrencyData() {
    axios.get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => {
        const wanted = ["bitcoin", "ethereum", "litecoin"]
        const data = response.data.filter(currency => wanted.includes(currency.id))
        this.setState({ data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Cryptocurrency data={this.state.data} />
    )
  }
}

export default CryptoCurrencyContainer
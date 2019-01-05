import React, { PureComponent } from 'react';
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
        "AED": 3.673014,
        "AFN": 75.319371,
        "ALL": 108.32,
        "AMD": 485.318768,
        "ANG": 1.775241,
        "AOA": 309.1835,
        "ARS": 37.371,
        "AUD": 1.406527,
        "AWG": 1.800506,
        "AZN": 1.7025,
        "BAM": 1.714189,
        "BBD": 2,
        "BDT": 83.85,
        "BGN": 1.71672,
        "BHD": 0.376909,
        "BIF": 1814.5,
        "BMD": 1,
        "BND": 1.576096,
        "BOB": 6.91125,
        "BRL": 3.719608,
        "BSD": 1,
        "BTC": 0.000263740789,
        "BTN": 69.60531,
        "BWP": 10.756008,
        "BYN": 2.172746,
        "BZD": 2.016138,
        "CAD": 1.340014,
        "CDF": 1630.5,
        "CHF": 0.986025,
        "CLF": 0.024214,
        "CLP": 682.500686,
        "CNH": 6.865497,
        "CNY": 6.8694,
        "COP": 3193.32,
        "CRC": 604.627506,
        "CUC": 1,
        "CUP": 25.75,
        "CVE": 97.3515,
        "CZK": 22.423,
        "DJF": 178.025,
        "DKK": 6.547422,
        "DOP": 50.485,
        "DZD": 118.39,
        "EGP": 17.912,
        "ERN": 14.997455,
        "ETB": 28.435,
        "EUR": 0.876734,
        "FJD": 2.141055,
        "FKP": 0.785784,
        "GBP": 0.785784,
        "GEL": 2.675,
        "GGP": 0.785784,
        "GHS": 4.8257,
        "GIP": 0.785784,
        "GMD": 49.445,
        "GNF": 9200,
        "GTQ": 7.729231,
        "GYD": 208.995705,
        "HKD": 7.83465,
        "HNL": 24.479979,
        "HRK": 6.521685,
        "HTG": 77.646573,
        "HUF": 281.3155,
        "IDR": 14221,
        "ILS": 3.712305,
        "IMP": 0.785784,
        "INR": 69.550469,
        "IQD": 1191,
        "IRR": 42105,
        "ISK": 117.649949,
        "JEP": 0.785784,
        "JMD": 127.64,
        "JOD": 0.710306,
        "JPY": 108.45183333,
        "KES": 102.06,
        "KGS": 68.707788,
        "KHR": 4020,
        "KMF": 433.703988,
        "KPW": 900,
        "KRW": 1117.07,
        "KWD": 0.303396,
        "KYD": 0.833457,
        "KZT": 376.035446,
        "LAK": 8555,
        "LBP": 1508.15,
        "LKR": 182.75,
        "LRD": 157.524595,
        "LSL": 14.45744,
        "LYD": 1.395,
        "MAD": 9.518874,
        "MDL": 17.139521,
        "MGA": 3485,
        "MKD": 54.140913,
        "MMK": 1544.792633,
        "MNT": 2453.75,
        "MOP": 8.070209,
        "MRO": 357,
        "MRU": 36.4625,
        "MUR": 34.421,
        "MVR": 15.459996,
        "MWK": 721.985,
        "MXN": 19.446433,
        "MYR": 4.121758,
        "MZN": 61.450531,
        "NAD": 14.33,
        "NGN": 364.5,
        "NIO": 32.44,
        "NOK": 8.619359,
        "NPR": 111.368984,
        "NZD": 1.482695,
        "OMR": 0.384996,
        "PAB": 1,
        "PEN": 3.35279,
        "PGK": 3.369758,
        "PHP": 52.487928,
        "PKR": 139,
        "PLN": 3.758975,
        "PYG": 5988.182772,
        "QAR": 3.641259,
        "RON": 4.086805,
        "RSD": 103.780462,
        "RUB": 67.5808,
        "RWF": 875,
        "SAR": 3.75175,
        "SBD": 8.183309,
        "SCR": 13.646031,
        "SDG": 47.46,
        "SEK": 8.963682,
        "SGD": 1.359296,
        "SHP": 0.785784,
        "SLL": 8390,
        "SOS": 579.75,
        "SRD": 7.458,
        "SSP": 130.2634,
        "STD": 21050.59961,
        "STN": 21.51,
        "SVC": 8.752395,
        "SYP": 514.990045,
        "SZL": 14.33,
        "THB": 31.9945,
        "TJS": 9.416095,
        "TMT": 3.499986,
        "TND": 2.965694,
        "TOP": 2.276172,
        "TRY": 5.321194,
        "TTD": 6.77805,
        "TWD": 30.791,
        "TZS": 2300.4,
        "UAH": 27.721,
        "UGX": 3725.851979,
        "USD": 1,
        "UYU": 32.475095,
        "UZS": 8335,
        "VEF": 248487.642241,
        "VES": 637.579141,
        "VND": 23218.468808,
        "VUV": 111.596728,
        "WST": 2.606717,
        "XAF": 575.099879,
        "XAG": 0.06359513,
        "XAU": 0.00077854,
        "XCD": 2.70255,
        "XDR": 0.71685,
        "XOF": 575.099879,
        "XPD": 0.0007676,
        "XPF": 104.622209,
        "XPT": 0.00121881,
        "YER": 250.311815,
        "ZAR": 13.958779,
        "ZMW": 11.978,
        "ZWL": 322.355011
      },
      selectedOption: [{
        "value": "UAH",
        "label": "UAH"
      }],
  };
  }

  componentDidMount() {
    this.fetchCryptocurrencyData();
    // this.fetchCurrencyData()
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
    const APP_ID = process.env.REACT_APP_OPENEXCHANGERATES_ORG_ID
    console.log('api', APP_ID)
    const api = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`
    
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
  }

  render() {
    const { selectedOption } = this.state

    const tickers = this.state.data.map((currency) =>
      <Cryptocurrency data={currency} key={currency.id} />
    )

    const tickersCurrency = selectedOption.map((currency, index) =>
      {
        return <Currency value={this.state.dataCurrency[currency.label]} name={currency.label} key={index} />
      }
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
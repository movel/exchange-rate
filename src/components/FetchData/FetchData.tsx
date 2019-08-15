import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { REACT_API_CURRENCY_LAYER_COM, REACT_API_GOOGLE_FIREBASE } from '../../env.local'

const FetchData = () => {
  const [dataCurrency, setDataCurrency] = useState({USDJPY: 108.45183333,})  
  
  let quotes: any = null
  let quotesGoogle: any = null
  let quotesKeys: any = []
  let isActualData = false
  let lastData: any = null

  let date: string = new Date().toISOString().split('T')[0]

  const fetchGoogleFirebase = async () => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'currency.json'

    try {
      await axios.get(apiTimeSeries.trim())
      .then(response => {
        quotesGoogle = response.data
      })
    } catch (e) {
      console.log(e)
    }
  }

  const postGoogleFirebase = async (curr: any, dateItem: string) => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'currency.json'

    let currency: any = curr
    currency.date = dateItem

    try {
      await axios.post(apiTimeSeries.trim(), currency)
      .then(() => {
        fetchGoogleFirebase()
      }) 
    } catch (e) {
      console.log(e)
    }
  }
  
  // const fetchCurrencyData = async () => {
  //   const APP_ID = REACT_API_CURRENCY_LAYER_COM

  //   let apiTimeSeries = `http://apilayer.net/api/live?access_key=${APP_ID}`
  //   apiTimeSeries += '&source=USD&format=1'

  //   try{
  //     await axios.get(apiTimeSeries.trim())
  //     .then(response => {
  //       quotes = response.data.quotes
  //       setDataCurrency(quotes)
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const fetchCurrencyDataHistoricalRates = async (dateNow: string) => {
    const APP_ID = REACT_API_CURRENCY_LAYER_COM

    let apiTimeSeries = `http://apilayer.net/api/historical?access_key=${APP_ID}`
    apiTimeSeries += '&date=' + dateNow

    try {
      await axios.get(apiTimeSeries.trim())
      .then(response => {
        quotes = response.data.quotes
        setDataCurrency(quotes)
      })
    } catch (e) {
      console.log(e)
    }
    
  }

  function daysLag(dateString1: string, dateString2: string) {
    let date1 = new Date(dateString1)
    let date2 = new Date(dateString2)
    return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24))
  }

  function getDateStart(dateString: string, days: number) {
    let dateNow = new Date(dateString)
    let dateCopy = new Date(dateNow)
  
    dateCopy.setDate(dateNow.getDate() - days)
    return dateCopy.toISOString().split('T')[0]
  }

  let difference = 0
  let records = 0
  let itemsOfDelete = 0
  let itemsOfReceived = 0
  let itemsDateStart = ''

  fetchGoogleFirebase()
  .then(() => { // Get keys all quotes
    Object.keys(quotesGoogle).forEach(key => {
      quotesKeys.push({
        id: key
      })
    })
  })
  .then(async () => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'currency/' + quotesKeys[quotesKeys.length - 1].id + '.json'
    records = quotesKeys.length
    
    try {
      await axios.get(apiTimeSeries.trim())
      .then(response => {
        lastData = response.data
        if(lastData.date === date) {
          setDataCurrency(lastData)
          isActualData = true
        }
      })
    } catch (e) {
      console.log(e)
    }
  }) 
  .then(async () => {
    if(!isActualData) {
      difference = daysLag(date, lastData.date)
      if(difference > 10) {
        itemsOfDelete = 10
        itemsOfReceived = 10
      } else {
        itemsOfDelete = difference + records - 11
        itemsOfReceived = difference
      }
      itemsDateStart = getDateStart(date, itemsOfReceived - 1)

      if(itemsOfDelete > 0) {
        for(let i=0; i < itemsOfDelete; i++) {
          try {
            await axios.delete(REACT_API_GOOGLE_FIREBASE + 'currency/' + quotesKeys[quotesKeys.i].id + '.json')
          } catch (e) {
            console.log(e)
          }
        }
      }
    }      
  })
  .then(async () => {
    if(!isActualData) {
      if(itemsOfReceived > 0) {
        fetchCurrencyDataHistoricalRates(itemsDateStart)
        .then(() => {
          postGoogleFirebase(quotes, itemsDateStart)
        })
      }
    }
  })
  .then(async () => {
    if(!isActualData) {
      let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'currency/' + quotesKeys[quotesKeys.length - 1].id + '.json'
      records = quotesKeys.length

      try {
        await axios.get(apiTimeSeries.trim())
        .then(response => {
          lastData = response.data
          setDataCurrency(lastData)
          isActualData = true
        })
      } catch (e) {
        console.log(e)
      }
    }
  })
  

  // .then(() => {
  //   if(isActualData) {
  //     setDataCurrency(lastData)
  //   } else { 
  //     // fetchCurrencyData().then(() => postGoogleFirebase(quotes))
  //   }
  // })
  
  // https://stackoverflow.com/questions/55840294/how-do-i-fix-missing-dependency-in-react-hook-useeffect
}

export default FetchData

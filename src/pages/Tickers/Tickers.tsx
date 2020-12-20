import React, { createContext, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import CurrenciesContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import { MultiValueContainer, Option, options } from '../Tickers/ReactSelect'
import './Tickers.sass'
import { AppStateType } from '../../store/reducers/AppStateType'
import { logout } from '../../store/actions/auth'
import { addSelectedError, addSelected } from '../../store/actions/selected'
import { fetchConfigFromFirebase, postGoogleFirebase, patchGoogleFirebase } from '../../store/actions/config'
import { checkActualData, fetchGoogleFirebase } from '../../store/actions/rates'
import { getSelected, getConfig, getConfigKey, getActualData, getIsAuthenticated, getToken, getUserId, getQuotes } from '../../store/selectors'

// type MapStateToPropsType = {
//   selected: Array<SelectedType>,
//   config: Array<ConfigType>,
//   isAuthenticated: boolean,
//   token: string,
//   userId: string,
//   config_key: string,
//   isActualData: boolean,
// }

type MapDispatchToPropsTypeAuth = {
  logout: () => void,
}

type MapDispatchToPropsTypeSelected = {
  addSelectedError: (err: Error) => void,
  addSelected: (selected: []) => void,
}

type MapDispatchToPropsTypeConfig = {
  fetchConfigFromFirebase: (userId: string) => void,
  postGoogleFirebase: (data: []) => void,
  patchGoogleFirebase: (key: string, data: []) => void,
}

type MapDispatchToPropsTypeRates = {
  checkActualData: () => void,
  fetchGoogleFirebase: () => void,
}

type MapDispatchToPropsType = 
  | MapDispatchToPropsTypeAuth
  | MapDispatchToPropsTypeSelected
  | MapDispatchToPropsTypeConfig
  | MapDispatchToPropsTypeRates

const selectedContext = createContext([])

const Tickers = (props: any) => {
  // const [selectedOption, setSelectedOption] = useState(props.selected.selected)

  useEffect(() => {
    // Load Config data for user
    let configData: { userId: string; selected: []} = { userId: '', selected: []}

    if(props.isAuthenticated) {
      let configFromLocalStorage: string | null = localStorage.getItem('dataConfig')
      if (typeof configFromLocalStorage === 'string') {
        configData = JSON.parse(configFromLocalStorage)
        if(configData.userId && configData.userId === props.userId) {
          // Load config from LocalStorage
          props.addSelected(configData.selected)
        } else {
          // Remove config data for other user
          localStorage.removeItem('dataConfig')
          // Load config data from FireBase
          props.fetchConfigFromFirebase(props.userId)
        }
      }      
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let ratesData: string | null = null

    if(props.isAuthenticated) {
      let ratesFromLocalStorage: string | null = localStorage.getItem('dataRates')
      if (typeof ratesFromLocalStorage === 'string') {
        ratesData = JSON.parse(ratesFromLocalStorage)
        if(ratesData && ratesData=== props.rates) {
          // Load rates from LocalStorage
          console.log('1')
        } else {
          // Remove rates data for other user
          localStorage.removeItem('dataRates')
          // Load rates data from FireBase
          // let quotesRates = props.fetchRates()
          // console.log(quotesRates)
          // console.log('2')
        }
      } else if(ratesFromLocalStorage == null) {
        // Load rates data from FireBase
        props.fetchGoogleFirebase()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    //remove duplicates in quotes
    let quotes = props.quotes
    let keysQuotes: Object | any = {}
    Object.keys(quotes).forEach(key => {
      if(keysQuotes.hasOwnProperty(quotes[key].date)) delete quotes[key]
      else keysQuotes[quotes[key].date] = key
    })
  },[props.quotes])

  const handleChange = (selectedOption: any) => {
    // setSelectedOption(selectedOption)
    props.addSelected(selectedOption)
    // Save config on FireBase
    if(props.isAuthenticated) {
      let post_config_data = { userId: props.userId, selected: selectedOption }
      let config_key: string = props.config_key
      if(config_key) {
        props.patchGoogleFirebase(config_key, post_config_data)
      }
      else {
        props.postGoogleFirebase(post_config_data)
      }
    } 
  }

  return (
    <div className="tickers__container">
      <h1>Tickers</h1>
      <button onClick={() => {
        props.logout(() => {
          props.history.push("/");
        });
      } }>
        Logout
      </button>
      <br />
      <selectedContext.Provider value={props.selected.selected}>
        <CurrenciesContainer />
      </selectedContext.Provider>
      <br />
        <Select 
          closeMenuOnSelect={false}
          value={ props.selected.selected }
          onChange={ handleChange }
          components={{ MultiValueContainer, Option }}
          isMulti 
          options={ options }
          styles={{ option: (base) => ({ ...base, height: '100%' })}}
          className='react-select-container'
          classNamePrefix='react-select'
        />
    </div>
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    selected: getSelected(state),
    config: getConfig(state),
    isAuthenticated: getIsAuthenticated(state),
    token: getToken(state),
    userId: getUserId(state),
    config_key: getConfigKey(state),
    isActualData: getActualData(state),
    quotes: getQuotes(state),
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => void): MapDispatchToPropsType => ({
  addSelectedError: (err: Error) => dispatch(addSelectedError(err)),
  addSelected: (selected: []) => dispatch(addSelected(selected)),
  logout: () => dispatch(logout()),
  fetchConfigFromFirebase: (userId: string) => dispatch(fetchConfigFromFirebase(userId)),
  postGoogleFirebase: (data: []) => dispatch(postGoogleFirebase(data)),
  patchGoogleFirebase: (key: string, data: []) => dispatch(patchGoogleFirebase(key, data)),
  checkActualData: () => dispatch(checkActualData()),
  fetchGoogleFirebase: () => dispatch(fetchGoogleFirebase()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tickers)
export { selectedContext }
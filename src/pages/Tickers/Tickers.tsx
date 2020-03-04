import React, { useState, createContext, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import CurrenciesContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import { MultiValueContainer, Option, options } from '../Tickers/ReactSelect'
import './Tickers.sass'
import { State } from '../../store/reducers'
import { addSelectedError, addSelected, logout, fetchConfigFromFirebase, postGoogleFirebase, patchGoogleFirebase, checkActualData } from '../../store/actions'
import { getSelected, getConfig, getConfigKey, getActualData, getIsAuthenticated, getToken, getUserId } from '../../store/selectors'

const selectedContext = createContext([])

const Tickers = (props: any) => {
  const [selectedOption, setSelectedOption] = useState(props.selected.selected)

  useEffect(() => {
    // Load Config data for user
    let configData = null

    if(props.isAuthenticated) {
      console.log('ue')
      let configFromLocalStorage = localStorage.getItem('dataConfig')
      if (typeof configFromLocalStorage === 'string') {
        configData = JSON.parse(configFromLocalStorage)
        if(configData.userId && configData.userId === props.userId) {
          console.log('ue_local')
          // Load config from LocalStorage
          setSelectedOption(configData.selected)
          props.addSelected(configData.selected)
        } else {
          console.log('ue_bd')
          // Remove config data for other user
          localStorage.removeItem('dataConfig')
          // Load config data from FireBase
          console.log('userId___', props.userId)
          props.fetchConfigFromFirebase(props.userId)
        }
      }      
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
    
  //     setSelectedOption(props.config.config[0])
    
    
      
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.selected])

  useEffect(() => {
    // Load Currencies data
    // Check Last data on FireBase
    // let rates: any  = null
    // let actualData = false

    // props.checkActualData()
    // .then(() => {
    //   let ratesFromLocalStorage = localStorage.getItem('rates')
    //   if (typeof ratesFromLocalStorage === 'string') {
    //     rates = JSON.parse(ratesFromLocalStorage)
    //   }

    //   actualData = rates.actualData
    //   if(actualData) {

    //   } else {

    //   }
    // })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.config])

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    props.addSelected(selectedOption)
    // Save config on FireBase
    if(props.isAuthenticated) {
      let post_config_data = { userId: props.userId, selected: selectedOption }
      let config_key: string = props.config_key
      if(config_key) {
        console.log('3', config_key)
        props.patchGoogleFirebase(config_key, post_config_data)
      }
      else {
        console.log('4', config_key)
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

const mapStateToProps = (state: State) => {
  return ({
    selected: getSelected(state),
    config: getConfig(state),
    isAuthenticated: getIsAuthenticated(state),
    token: getToken(state),
    userId: getUserId(state),
    config_key: getConfigKey(state),
    isActualData: getActualData(state),
  });
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    addSelectedError: (err: Error) => dispatch(addSelectedError(err)),
    addSelected: (selected: []) => dispatch(addSelected(selected)),
    logout: () => dispatch(logout()),
    fetchConfigFromFirebase: (userId: string) => dispatch(fetchConfigFromFirebase(userId)),
    postGoogleFirebase: (data: []) => dispatch(postGoogleFirebase(data)),
    patchGoogleFirebase: (key: string, data: []) => dispatch(patchGoogleFirebase(key, data)),
    checkActualData: () => dispatch(checkActualData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickers)
export { selectedContext }
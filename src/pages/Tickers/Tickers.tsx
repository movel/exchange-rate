import React, { useState, createContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import Select, { components } from 'react-select'
import CurrenciesContainer from '../../containers/CurrenciesContainer/CurrenciesContainer'
import * as constants from '../../options'
import './Tickers.sass'
import { addSelectedError, addSelected } from '../../store/actions/selected'
import { State } from '../../store/reducers'
import { logout } from '../../store/actions/auth'
import { fetchConfigFromFirebase, postGoogleFirebase, patchGoogleFirebase } from '../../store/actions/config'

const MultiValueContainer = (props: { data: { title: string | undefined; }; }) => {
  return (
    <div title={props.data.title}>
      <components.MultiValueContainer {...props}/>
    </div>
  )
}

const Option = (props: any) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerProps } = props;
  const ref = React.createRef()
  
  return (
    <div
      ref={ref}
      className={cx(
        css(getStyles('option', props)),
        {
          'option': true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className
      )}
      {...innerProps}
    >
      {children}<span className="tooltip">{props.data.title}</span>
    </div>
  );
};

const options: any = constants.options.map(item => {
  let title = constants.currencies.find(element => {
    return element.value === item.value
  })
  if(title === undefined) title = {value:'no data', label:'no data'}
  return {...item, title: title.label}
})

const selectedContext = createContext([])

const Tickers = (props: any) => {
  const [selectedOption, setSelectedOption] = useState(props.selected.selected)

  useEffect(() => {
    if(props.isAuthenticated) {
      props.fetchConfigFromFirebase(props.userId)      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    props.addSelected(selectedOption)
    if(props.isAuthenticated) {
      let post_config_data = { userId: props.userId, selected: selectedOption }
      if(!!props.config.config) {
        props.patchGoogleFirebase(post_config_data)
      } else {
        props.postGoogleFirebase(post_config_data)
      }
      
      // props.fetchConfigFromFirebase(props.userId)
    }
  }

  // console.log('selectedOption', selectedOption)

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
      <selectedContext.Provider value={selectedOption}>
        <CurrenciesContainer />
      </selectedContext.Provider>
      <br />
        <Select 
          closeMenuOnSelect={false}
          value={ selectedOption }
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
    selected: state.selected,
    config: state.config,
    isAuthenticated: !!state.auth.token,
    token: state.auth.token,
    userId: state.auth.userId,
  });
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    addSelectedError: (err: Error) => dispatch(addSelectedError(err)),
    addSelected: (selected: []) => dispatch(addSelected(selected)),
    logout: () => dispatch(logout()),
    fetchConfigFromFirebase: (userId: string) => dispatch(fetchConfigFromFirebase(userId)),
    postGoogleFirebase: (data: []) => dispatch(postGoogleFirebase(data)),
    patchGoogleFirebase: (data: []) => dispatch(patchGoogleFirebase(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickers)
export { selectedContext }
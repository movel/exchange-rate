import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { css } from 'emotion'
import Select, { components } from 'react-select'
import Tooltip from '@atlaskit/tooltip'
import * as constants from '../options'
import auth from '../components/Auth/Auth'

const MultiValueContainer = (props: any) => {
  return (
    <Tooltip content={props.data.title}>
      <components.MultiValueContainer {...props}/>
    </Tooltip>
  )
}

const Option = (props: any) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
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
      title={props.data.title}
    >
      {children}
    </div>
  );
};

const options = constants.options.map(item => {
  const title = constants.currencies.find(element => {
    if(element.value === item.value) return element.label
    else return ''
  })
  return {...item, title: title}
})

const Tickers = (props: RouteComponentProps) => {
  return (
    <>
      <h1>Tickers</h1>
      <button onClick={() => {
        auth.logout(() => {
          props.history.push("/");
        });
      } }>
        Logout
      </button>
      <br />
      <img src="https://foter.com/photos/394/portrait-of-three-dogs-on-dirt-road.jpg" alt="dogs" />
      <br />
      
    </>
  )
}

export default Tickers
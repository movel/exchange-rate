import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom'


const goTo = (route: string, props: RouteComponentProps): any => {
  props.history.replace(`/${route}`)
}

const Menu = (props: RouteComponentProps) => {

    return (
      <div className="menu">
          <button
            className="button__menu"
            onClick={() => goTo('home', props)}
          >
            На главную
          </button>
          <button
            className="button__menu"
            onClick={() => goTo('profile', props)}
          >
            Профиль
          </button>
          <button
            className="button__menu"
            onClick={() => goTo('login', props)}
          >
            Log In
          </button>
          <button
            className="button__menu"
            onClick={() => goTo('page-not-found', props)}
          >
            404
          </button>
      </div>
    );
  
}

export default withRouter(Menu);
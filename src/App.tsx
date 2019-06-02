import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'

import routes from './routes'
import Menu from '../src/components/Menu/Menu'
import Loading from '../src/components/Loading/Loading'

import './App.css'

type Props = {
  history: History
}

const App = (props: Props) => {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
          <Router>
            <header>
              <Menu />
            </header>
            <Suspense fallback={<Loading />}>
              <div className="page">
                {routes}
              </div>
            </Suspense>
          </Router>
      </ConnectedRouter>
    </div>
  )
}

export default App
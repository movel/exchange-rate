import React, { Suspense } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import routes from './routes'
import Menu from '../src/components/Menu/Menu'
import Loading from '../src/components/Loading/Loading'

import './App.css'

type AppProps = {
  history: History
}

const App = ({ history }: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
          <header>
            <Menu />
          </header>
          <Suspense fallback={<Loading />}>
            <div className="page">
              {routes}
            </div>
          </Suspense>
      </div>
    </ConnectedRouter>
  )
}

export default App
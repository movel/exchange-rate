import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'
import Menu from '../src/components/Menu/Menu'
import Loading from '../src/components/Loading/Loading'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Router>
        <header>
          <Menu />
        </header>
        <Suspense fallback={ <Loading />}>
          <div className="page">
            { routes }
          </div>
        </Suspense>
      </Router>
    </div>
  );
}

export default App
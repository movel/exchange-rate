import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'
import Menu from '../src/components/Menu/Menu'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="page">
            { routes }
          </div>
        </Suspense>
      </Router>
    </div>
  );
}

export default App
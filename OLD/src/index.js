import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/components/App';
import { BrowserRouter } from 'react-router-dom';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// Hot reload module
if(module.hot) {
  module.hot.accept()
}

ReactDOM.render(app, document.getElementById('root'));
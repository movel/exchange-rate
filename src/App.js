import React, { Component } from 'react';
import Layout from './hoc/layout/Layout'
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>Layout works</h1>
        </div>
      </Layout>
    );
  }
}

export default App;

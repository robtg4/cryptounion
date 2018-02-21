//barebone imports
import React, { Component } from 'react'
//internal component imports
import Header from './components/Header'
//internal page imports
import Main from './pages/Main'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App

import React, { Component } from 'react'
import HomeContainer from "./containers/HomeContainer";

class App extends Component {
  render() {
    
    //global vars
    const version = 2//TODO: where to put these?

    return (
      <div className="App">
        <HomeContainer version={version} />
      </div>
    )
  }
}
export default App

import React, { Component } from 'react'
import { Route, BrowserRouter  as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

import HomeContainer from "./containers/HomeContainer"
import QuizContainer from './containers/QuizContainer'
import ParticipationContainer from './containers/ParticipationContainer'
import ResultsContainer from './containers/ResultsContainer'
import MapContainer from './containers/MapContainer'
import IdeologiesContainer from './containers/IdeologiesContainer'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      version: 2
    }
  }

  setVersion = (version) => {
    this.setState(() => {
      return {
        version: version
      }
    })
  }

  render() {

    const WrapperComponent = (props) => {
      
      const search = props.location.search
      const params = new URLSearchParams(search)
      
      let testResult = {
        economic: parseFloat(params.get('e')),
        diplomatic: parseFloat(params.get('d')),
        civil: parseFloat(params.get('c')),
        societal: parseFloat(params.get('s'))
      }
      
      return <ResultsContainer {...props} testResult = { testResult } setVersion = { this.setVersion } />
    }
    
    return (
      <Provider store={ store }>
        <Router>

          <Route path="/" exact render={(props) => (
            <HomeContainer
              {...props}
              version={ this.state.version } />
          )} />

          <Route path="/quiz" exact render={(props) => (
            <QuizContainer 
              {...props}
              version = { this.state.version }
            />
          )} />

          <Route path="/participation" exact render={(props) => (
            <ParticipationContainer 
              {...props}
              version={ this.state.version } 
            />
          )} />

          <Route path="/map" exact render={(props) => (
            <MapContainer
              {...props}
            />
          )} />
          
          <Route path="/results" component={ WrapperComponent } />

          <Route path="/ideologies" exact render={(props) => (
            <IdeologiesContainer 
              {...props} />
          )} />

        </Router>
      </Provider>
    )  
  } 
}
export default App


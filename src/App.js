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
      testResult: null
    }
  }

  setTestResult = (testResult) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        testResult: testResult
      }
    })
  }

  render() {
    
    return (
      <Provider store={ store }>
        <Router>
          <Route path="/" exact render={(props) => (
            <HomeContainer
              {...props}
              version={ this.state.version }/>
          )} />

          {/* TODO: remember this route */}
          <Route path="/version1" exact render={(props) => {
            return <QuizContainer 
              {...props}
              version={ 1 } 
              setTestResult={ this.setTestResult }
            />
          }} />
          
          <Route path="/quiz" exact render={(props) => (
            <QuizContainer 
              {...props}
              version = { 2 }
              setTestResult={ this.setTestResult }
            />
          )} />

          <Route path="/participation" exact render={(props) => (
            <ParticipationContainer 
              {...props}
              version={ this.state.version } 
              testResult={ this.state.testResult }
            />
          )} />

          <Route path="/map" exact render={(props) => (
            <MapContainer
              {...props}
            />
          )} />
          
          <Route path="/results/:economic/:diplomatic/:civil/:societal" exact render={(props) => (
            <ResultsContainer 
              {...props}
              testResult={ {
                economic: parseFloat(props.match.params.economic),
                diplomatic: parseFloat(props.match.params.diplomatic),
                civil: parseFloat(props.match.params.civil),
                societal: parseFloat(props.match.params.societal)
              } } 
            />
          )} />

          <Route path="/ideologies" exact render={(props) => (
            <IdeologiesContainer {...props} />
          )} />
        </Router>
      </Provider>
    )  
  } 
}
export default App
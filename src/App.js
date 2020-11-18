import React, { Component } from 'react'
import { Route, Redirect, BrowserRouter  as Router } from "react-router-dom"

import HomeContainer from "./containers/HomeContainer";
import QuizContainer from './containers/QuizContainer';
import ParticipationContainer from './containers/ParticipationContainer';
import ResultsContainer from './containers/ResultsContainer';
import MapContainer from './containers/MapContainer';

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      version: 2,
      urlPrefix: 'http://127.0.0.1:3000',
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
      <Router>
        
        <Route path="/" exact render={(props) => (
          <HomeContainer
            {...props}
            version={ this.state.version }
            />)} />

        <Route path="/quiz" exact render={(props) => (
          <QuizContainer 
            {...props}
            version={ this.state.version } 
            urlPrefix={ this.state.urlPrefix }
            setTestResult={ this.setTestResult }
          />
        )} />

        <Route path="/participation" exact render={(props) => (
          <ParticipationContainer 
            {...props}
            version={ this.state.version } 
            urlPrefix={ this.state.urlPrefix }
            testResult={ this.state.testResult }
            setTestResult={ this.setTestResult }
          />
        )} />

        <Route path="/map" exact render={(props) => (
          <MapContainer
            {...props}
           />
        )} />
        
        <Route path="/results/:economic/:diplomatic/:civil/:societal" exact render={(props) => (
          <ResultsContainer 
            testResult={ {
              economic: parseFloat(props.match.params.economic),
              diplomatic: parseFloat(props.match.params.diplomatic),
              civil: parseFloat(props.match.params.civil),
              societal: parseFloat(props.match.params.societal)
            } } 
            urlPrefix={ this.state.urlPrefix }
          />
        )} />

      </Router>
    )  
  } 
}
export default App
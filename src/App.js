import React, { Component } from 'react'
import HomeContainer from "./containers/HomeContainer";
import QuizContainer from './containers/QuizContainer';
import ParticipationContainer from './containers/ParticipationContainer';
import ResultsContainer from './containers/ResultsContainer';

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      homeContainerVisible: true,
      quizContainerVisible: false,
      version: 2,
      urlPrefix: 'http://127.0.0.1:3000',
      currentContainer: <HomeContainer 
                            version={2} 
                            onGotoQuiz={ this.onGotoQuiz } 
                            />
    }
  }

  onGotoQuiz = () => {
    this.setState((previousState) => {
      return {
        ...previousState,
        currentContainer:<QuizContainer 
                            version={ previousState.version } 
                            urlPrefix={ previousState.urlPrefix }
                            onGotoParticipation={ this.onGotoParticipation }
                            />
      }
    })
  }

  onGotoParticipation = (testResult) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        currentContainer:<ParticipationContainer 
                            version={ previousState.version }
                            urlPrefix={ previousState.urlPrefix }
                            testResult={ testResult }
                            onGotoResult={ this.onGotoResult }
                            />
      }
    })
  }

  onGotoResult = (testResult) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        currentContainer:<ResultsContainer testResult={ testResult } />
      }
    })
  }
  
  render() {
    return  <div className="App">
              { this.state.currentContainer }
            </div>
  }
}
export default App

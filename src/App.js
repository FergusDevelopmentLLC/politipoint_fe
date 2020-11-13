import React, { Component } from 'react'
import HomeContainer from "./containers/HomeContainer";
import QuizContainer from './containers/QuizContainer';

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      homeContainerVisible: true,
      quizContainerVisible: false,
      version: 2,
      urlPrefix: 'http://127.0.0.1:3000',

    }
  }

  onGotoQuiz = () => {
    this.setState(() => {
      return {
        homeContainerVisible: false,
        quizContainerVisible: true
      }
    })
  }

  render() {
    if(this.state.homeContainerVisible) {
      return <div className="App"><HomeContainer version={ this.state.version} onGotoQuiz={ this.onGotoQuiz } /></div>
    }
    else if (this.state.quizContainerVisible){
      return <div className="App"><QuizContainer version={ this.state.version } urlPrefix={ this.state.urlPrefix }/></div>
    }
    else {
      return <div className="App"></div>
    }

  }
}
export default App

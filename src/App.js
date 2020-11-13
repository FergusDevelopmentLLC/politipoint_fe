import React, { Component } from 'react'
import HomeContainer from "./containers/HomeContainer";
import QuizContainer from './containers/QuizContainer';

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      HomeContainerVisible: true,
      QuizContainerVisible: false
    }
  }

  onGotoQuiz = () => {
    this.setState(() => {
      return {
        HomeContainerVisible: false,
        QuizContainerVisible: true
      }
    })
  }

  render() {
    
    //global vars
    const version = 2//TODO: where to put these?

    if(this.state.HomeContainerVisible) {
      return <div className="App"><HomeContainer version={version} onGotoQuiz={ this.onGotoQuiz } /></div>
    }
    else if (this.state.QuizContainerVisible){
      return <div className="App"><QuizContainer/></div>
    }
    else {
      return <div className="App"></div>
    }

  }
}
export default App

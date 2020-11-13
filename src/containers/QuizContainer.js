import React, { Component, Fragment } from 'react'
import Statement from '../components/Statement'

class QuizContainer extends Component {

  constructor() {
    super()
    this.state = {
      questions: [],
      currentNumber: 1,
      currentText: 'Loading...'
    }
  }

  async componentDidMount() {
    let url = `${ this.props.urlPrefix }/questions/by_version/${ this.props.version }`
    let questions = await fetch(url).then(r => r.json())
    this.setState((previousState) => {
      return {
        ...previousState,
        questions: questions,
        currentText: questions[previousState.currentNumber - 1].question
      }
    })
  }

  render() {
    return (
      <Fragment>
      <div className='quiz-logo-wrapper'>
        <img alt='Politipoint' src="https://res.cloudinary.com/fergusdev/image/upload/v1602701055/politipoint/logos/politipoint-wordmark-color_ewmxr1.png" />
      </div>
      <hr/>
      <Statement 
        currentText={ this.state.currentText } 
        currentNumber={ this.state.currentNumber } 
        allStatementsCount={ this.state.questions.length } />

      </Fragment>
    )
  }
}

export default QuizContainer
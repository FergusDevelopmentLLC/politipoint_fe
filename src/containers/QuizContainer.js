import React, { Component, Fragment } from 'react'
import Statement from '../components/Statement'

class QuizContainer extends Component {

  constructor() {
    super()

    this.state = {
      version: null,
      questions: [],
      currentQuestion: 1
    }
  }

  render() {
    return (
      <Fragment>
      <div className='quiz-logo-wrapper'>
        <img alt='Politipoint' src="https://res.cloudinary.com/fergusdev/image/upload/v1602701055/politipoint/logos/politipoint-wordmark-color_ewmxr1.png" />
      </div>
      <hr/>
      <Statement />
      </Fragment>
    )
  }
}

export default QuizContainer
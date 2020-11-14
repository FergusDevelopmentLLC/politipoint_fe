import React, { Component, Fragment } from 'react'
import Statement from '../components/Statement'

class QuizContainer extends Component {

  constructor() {
    super()
    this.state = {
      questions: [],
      currentNumber: 0,
      currentText: 'Loading...',
      maxEconomic: 0,
      maxDiplomatic: 0,
      maxCivil: 0,
      maxSocietal: 0,
      userEconomicScore: 0,
      userDiplomaticScore: 0,
      userCivilScore: 0,
      userSocietalScore: 0
    }
  }

  calculateScore = (score, max) => {
    return (100 * (max + score) / (2 * max)).toFixed(1)
  }

  saveResult = async () => {

    let e = this.calculateScore(this.state.userEconomicScore, this.state.maxEconomic) 
    let d = this.calculateScore(this.state.userDiplomaticScore, this.state.maxDiplomatic)
    let g = this.calculateScore(this.state.userCivilScore, this.state.maxCivil) 
    let s = this.calculateScore(this.state.userSocietalScore, this.state.maxSocietal)

    let testResult = {
      question_version: this.props.version,
      economic: parseFloat(e),
      diplomatic: parseFloat(d),
      civil: parseFloat(g),
      societal: parseFloat(s)
    }
    
    const options = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify( { test_result: testResult } )
    }

    let apiUrl = `${this.props.urlPrefix}/test_results`

     await fetch(apiUrl, options)
              .then(res => res.json())
                .then(tr => {
                  this.props.onGotoParticipation()
                })
  }

  async componentDidMount() {

    let url = `${this.props.urlPrefix}/questions/by_version/${this.props.version}`
    
    let questions = await fetch(url).then(r => r.json())
    
    this.setState((previousState) => {
      return {
        ...previousState,
        questions: questions,
        currentText: questions[previousState.currentNumber].question
      }
    }, () => {
      this.setState((previousState) => {
        return {
          ...previousState,
          maxEconomic: questions.reduce((acc, question) => acc + Math.abs(question.effect.econ), 0),
          maxDiplomatic: questions.reduce((acc, question) => acc + Math.abs(question.effect.dipl), 0),
          maxCivil: questions.reduce((acc, question) => acc + Math.abs(question.effect.govt), 0),
          maxSocietal: questions.reduce((acc, question) => acc + Math.abs(question.effect.scty), 0)
        }
      })
    })
    
  }

  onResponse = async (multiplier) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        userEconomicScore:   prevState.userEconomicScore   += multiplier * prevState.questions[prevState.currentNumber].effect.econ,
        userDiplomaticScore: prevState.userDiplomaticScore += multiplier * prevState.questions[prevState.currentNumber].effect.dipl,
        userCivilScore:      prevState.userCivilScore      += multiplier * prevState.questions[prevState.currentNumber].effect.govt,
        userSocietalScore:   prevState.userSocietalScore   += multiplier * prevState.questions[prevState.currentNumber].effect.scty
      }
    }, async () => {
      //go to the next statement if not at end.
      if (this.state.currentNumber < this.state.questions.length - 1) {
        this.setState((prevState) => {
          const nextNumber = prevState.currentNumber + 1
          return {
            ...prevState,
            currentNumber: nextNumber,
            currentText: prevState.questions[nextNumber].question
          }
        })

        document.querySelector('.quiz-logo-wrapper').scrollIntoView({ 
          behavior: 'smooth' 
        })
        
      }
      else {
        await this.saveResult()
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
        allStatementsCount={ this.state.questions.length } 
        onResponse={ this.onResponse }
        />

      </Fragment>
    )
  }
}

export default QuizContainer
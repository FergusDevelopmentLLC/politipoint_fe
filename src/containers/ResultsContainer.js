import React, { Component, Fragment } from 'react'
import Continuum from '../components/Continuum'

class ResultsContainer extends Component {

  render() {

    return  <Fragment>
            <div className='logo-wrapper'>
              <img src='https://res.cloudinary.com/fergusdev/image/upload/v1602701054/politipoint/logos/politipoint-vertical-color_txkgp9.png' title='PolitiPoint.org' />
            </div>
            <hr/>
            <h3>Test Results</h3>
            <div id="results-container">
              <Continuum type='economic' value={ 5 } flip={ false }/>
            </div>
            
            </Fragment>
           
  }
}

export default ResultsContainer

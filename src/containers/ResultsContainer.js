import React, { Component, Fragment } from 'react'

class ResultsContainer extends Component {

  render() {

    return  <Fragment>
            <div>Results Container</div>
            <div>{ JSON.stringify(this.props.testResult) } </div>
            </Fragment>
           
  }
}

export default ResultsContainer

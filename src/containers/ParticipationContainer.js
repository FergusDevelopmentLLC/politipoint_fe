import React, { Component, Fragment } from 'react'
import StateCountySelector from '../components/StateCountySelector'

class ParticipationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testResult: this.props.testResult
    }
  }

  getLocationText = () => {
    if( this.props.testResult.county ) {

      let htmlContent = `Based on your IP address, your local county has been approximated to be: 
                         <strong>${ this.props.testResult.county.name }, ${this.props.testResult.county.state_abbrev}</strong>. If wish to affiliate 
                         with a different U.S. county, please select it below:`

      return <span dangerouslySetInnerHTML={{ __html: htmlContent }}></span>
    }
    else {
      return `Your local county could not be approximated. Please select it below:`
    }
  }

  setTestResultCounty = (countyGeoId) => {
    this.setState((previousState) => {

      let rebuilt = {
        ...previousState,
        testResult: {
          ...previousState.testResult,
          county_override: true
        }
      }
      delete rebuilt.testResult.county

      if(countyGeoId) {
        rebuilt.testResult.county = {
          geoid: countyGeoId
        }
      }
      
      return rebuilt

    }, () => {
      //console.log(this.state)
    })
  }
  
  render() {

    return (
      <Fragment>
        
        <div className='quiz-logo-wrapper'>
          <img alt='Politipoint' src="https://res.cloudinary.com/fergusdev/image/upload/v1602701055/politipoint/logos/politipoint-wordmark-color_ewmxr1.png" />
        </div>
        <hr/>

        <h2>Many Thanks!</h2>
        <p className="thankyou-instructions">
          We very much appreciate your feedback, and as mentioned, it will be use to improve question wording 
          in upcoming versions of PolitiPoint.
        </p>

        <h2>Location</h2>
        <p className="thankyou-instructions">{ this.getLocationText() }</p>

        <StateCountySelector selectedCountyGeoId={ this.state.testResult.county ? this.state.testResult.county.geoid : 0 } onCountyChange={ this.setTestResultCounty } />
        
        <h2>Share your results?</h2>
        <p className="thankyou-instructions">
          By checking the box below, your test results will be averaged with others from your county and presented on the national U.S. county map. 
        </p>

        <div>
          <input onChange={() => {
            this.setState((previousState) => {
              return {
                ...previousState,
                testResult: {
                  ...previousState.testResult,
                  opt_in: previousState.testResult.opt_in === true ? false : true
                }
              }
            },() => {
              //console.log(this.state)
            })
          }} type="checkbox" id="optinout" className="optin-out-checkbox" checked={ this.state.testResult.opt_in ? "checked" : ""} />
          <label className="optinout-label" htmlFor="optinout">
            I agree to share my test results
          </label>
        </div>

        <div className="button-wrapper">
          <button className="button" onClick={ async () => {

            
            if(this.state.testResult.county || !this.state.testResult.opt_in) {

              let testResultForSaving = {
                id: this.state.testResult.id,
                optIn: this.state.testResult.opt_in,
                countyOverride: this.state.testResult.county_override
              }

              if(this.state.testResult.county) {
                testResultForSaving = {
                  ...testResultForSaving,
                  countyGeoId: this.state.testResult.county.geoid
                }
              }
              
              const options = {
                method: 'PATCH',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify( { test_result: testResultForSaving } )
              }

              let apiUrl = `${ this.props.urlPrefix }/test_results_check`
              let savedTestResult = await fetch(apiUrl, options).then(r => r.json())

              this.props.onGotoResult(savedTestResult)
            }
            else {
              alert("Please select a county or opt out of sharing your test results.")
            }
          }}>View test results and map</button>
        </div>

      </Fragment>
    )
  }
}

export default ParticipationContainer

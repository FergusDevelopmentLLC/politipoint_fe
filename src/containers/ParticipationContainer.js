import React, { Component, Fragment } from 'react'
import StateCountySelector from '../components/StateCountySelector'
import { HeaderLogoSkinny }  from '../components/HeaderLogoSkinny'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTestResult } from '../actions/testResultActions'

class ParticipationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testResult: this.props.testResult
    }
  }

  getLocationText = () => {
    if( this.state.testResult && this.state.testResult.county ) {

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

    })
  }

  render() {

    return (
      <Fragment>
        
        <HeaderLogoSkinny version={ this.props.version } />

        <h2>Many Thanks!</h2>
        <p className="thankyou-instructions">
          We very much appreciate your feedback, and as mentioned, it will be use to improve question wording 
          in upcoming versions of PolitiPoint.
        </p>

        <h2>Location</h2>
        <p className="thankyou-instructions">{ this.getLocationText() }</p>

        <StateCountySelector 
          selectedCountyGeoId={ this.state.testResult && this.state.testResult.county ? this.state.testResult.county.geoid : 0 } 
          onCountyChange={ this.setTestResultCounty }
          />
        
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
            })
          }} type="checkbox" id="optinout" className="optin-out-checkbox" checked={ this.state.testResult && this.state.testResult.opt_in ? "checked" : ""} />
          <label className="optinout-label" htmlFor="optinout">
            I agree to share my test results
          </label>
        </div>

        <div className="button-wrapper">
          <Link className='button' to="#" onClick={ async () => {

            if(!this.state.testResult || (this.state.testResult && !this.state.testResult.economic)) {
              return
            }

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
              
              this.props.updateTestResult(testResultForSaving, this.props.history)
              
            }
            else {
              alert("Please select a county or opt out of sharing your test results.")
            }

          }}>View test results and map</Link>
        </div>

      </Fragment>
    )
  }
}

ParticipationContainer.propTypes = {
  testResult: PropTypes.object.isRequired,
  updateTestResult: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    testResult: state.testResultReducer.testResult
  }
}

export default connect(mapStateToProps, { updateTestResult })(ParticipationContainer)

import React, { Component } from 'react';
import { StateCounty } from "../data/stateCounty"

class StateCountySelector extends Component {
  constructor() {
    super()
    this.state = {
      stateCounties: [],
      counties: [],
      stateSelectValue: '',
      countySelectValue: ''
    }
  }
  
  componentDidMount() {
    this.setState((previousState) => {

      let counties = []
      let stateAbbrev = ''
      let countyGeoId = 0

      let state = StateCounty.find((state) => {
        return state.counties.map((county) => {
          return county.geoid
        }).includes(this.props.selectedCountyGeoId)
      })

      if(state) {
        counties = state.counties
        stateAbbrev = state.abbrev
        countyGeoId = state.counties.find((county) => {
          return county.geoid === this.props.selectedCountyGeoId
        }).geoid
      }

      return {
        ...previousState,
        stateCounties: StateCounty,
        counties: counties,
        stateSelectValue: stateAbbrev,
        countySelectValue: countyGeoId
      }
    })
  }

  render() {

    const filteredStates = ['AS', 'MP', 'VI', 'PR', 'GU']

    return  <div className="state-county-select-wrapper">
              <div>
                <label htmlFor="stateSelect">State</label>
                <select value={ this.state.stateSelectValue } onChange={(event) => {
                  this.setState((previousState) => {
                    const selectedState =  previousState.stateCounties.find(state => state.abbrev === event.target.value)
                    
                    //sending a null clears the test result county
                    this.props.onCountyChange(null)

                    return {
                      ...previousState,
                      counties: selectedState ? selectedState.counties : [],
                      stateSelectValue: selectedState ? selectedState.abbrev : '',
                      countySelectValue: ''
                    }
                  })
                }} className="select-css" id="stateSelect" size="1">
                  <option value="">-Select state-&nbsp;</option>
                  { 
                    this.state.stateCounties.reduce((acc, state) => {
                      if(!filteredStates.includes(state.abbrev)) {
                        acc.push(<option key={state.name} value={state.abbrev}>{ state.name }</option>) 
                      }
                      return acc
                    }, [])
                  }
                </select>
              </div>
              <div>&nbsp;</div>
              <div>
                <label htmlFor="countySelect">County</label>
                <select onChange={(event) => {

                  this.props.onCountyChange(event.target.value)
                  
                  this.setState((previousState) => {
                    return {
                      ...previousState,
                      countySelectValue: event.target.value
                    }
                  })

                }} value={ this.state.countySelectValue } className="select-css" id="countySelect" size="1">
                  <option value="">-Select county-&nbsp;</option>
                  { this.state.counties.map((county) => {
                    return <option key={county.name} value={county.geoid}>{ county.name } County</option>
                  })}
                </select>
              </div>
            </div>
            
  }
}

export default StateCountySelector


import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Map from '../components/Map'

import { fetchAveragedTestResults } from '../actions/testResultActions'
import PropTypes from 'prop-types'

const MapContainer = ({
  fetchAveragedTestResults,
  testResults = []
}) => {

  useEffect(() => {
    fetchAveragedTestResults()
  }, [fetchAveragedTestResults])

  return (
    <Map testResults = { testResults } />
  )
} 

MapContainer.propTypes = {
  fetchAveragedTestResults: PropTypes.func.isRequired,
  testResults: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    testResults: state.testResultReducer.averagedTestResults ? state.testResultReducer.averagedTestResults : []
  }
}

export default connect(mapStateToProps, { fetchAveragedTestResults })(MapContainer)
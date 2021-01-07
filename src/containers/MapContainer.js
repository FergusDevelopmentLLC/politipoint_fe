import React, { useEffect } from 'react'
import Map from '../components/Map/Map'
import { fetchAveragedTestResults } from '../actions/testResultActions'
import { useSelector, useDispatch } from "react-redux"

const MapContainer = ({
  fake = false
}) => {

  const dispatch = useDispatch()
  const testResults = useSelector(state => state.testResultReducer.averagedTestResults ? state.testResultReducer.averagedTestResults : [])
  
  useEffect(() => {
    dispatch(fetchAveragedTestResults(fake))
  }, [fake])

  return (
    <Map testResults={ testResults } />
  )
} 

export default MapContainer
import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "./css/map.albers.css"

import { allCounties } from "../../data/counties_albers"
import { getCountyFillColors } from './Utilities/utils'
import { handlePopup } from './Utilities/utils'
import { showPopup } from './Utilities/utils'

import ExtrudeMapControl from './controls/ExtrudeMapControl'
import ResetMapControl from './controls/ResetMapControl'
import RotateMapControl from './controls/RotateMapControl'
import LogoControl from './controls/LogoControl'
import LegendControl from './controls/LegendControl'

import { useDispatch } from 'react-redux'
import { clearAveragedTestResults } from '../../actions/testResultActions'

const Map = (props) => {
  
  const mapContainer = useRef(null)
  const [statefulMap, setStatefulMap] = useState(null)
  const testResults = props.testResults
  const dispatch = useDispatch()
  
  useEffect(() => {

    if(testResults.length === 0) return

    let rotating = false
    let countyOfInterest = {}
    let mapBounds = [-21, -18.25, 21, 14]// get bounding box: http://bboxfinder.com, Southwest corner, Northeast corner

    const getCountyOfInterest = () => countyOfInterest
    const setCountyOfInterest = newCounty => countyOfInterest = newCounty
    const isRotating = () => rotating
    const toggleRotation = () => rotating = !rotating
    
    const allTestsCount = testResults.reduce((acc, obj) => { return acc + obj.tr_count }, 0)

    const initMap = () => {

      mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw'
      
      const center = [(mapBounds[0] + mapBounds[2]) / 2, (mapBounds[1] + mapBounds[3]) / 2]
  
      const mapboxGlMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/willcarter/ckfps2kwa01u019pp7bel1a7w`,
        center: center,
        pitch: 0,
        attributionControl: false
      })
      
      let popup = new mapboxgl.Popup({
        offset: 0,
        closeButton: true,
        closeOnClick: false
      })

      mapboxGlMap.fitBounds([
        [mapBounds[0], mapBounds[1]],
        [mapBounds[2], mapBounds[3]]
      ])
      
      mapboxGlMap.addControl(new mapboxgl.NavigationControl(), 'top-left')
      mapboxGlMap.addControl(new ExtrudeMapControl(), 'top-right')
      mapboxGlMap.addControl(new mapboxgl.FullscreenControl(), 'top-right')
      mapboxGlMap.addControl(new RotateMapControl(isRotating, toggleRotation), 'top-right')
      mapboxGlMap.addControl(new ResetMapControl(isRotating, toggleRotation, setCountyOfInterest, mapBounds) , 'top-right')
      mapboxGlMap.addControl(new LogoControl(), 'bottom-left')
      
      mapboxGlMap.addControl(new LegendControl(allTestsCount), 'bottom-right')

      mapboxGlMap.scrollZoom.disable()
      
      mapboxGlMap.on('moveend', () => {

        if(Object.keys(countyOfInterest).length > 0) {
          showPopup(mapboxGlMap, countyOfInterest, testResults, popup)
        }
        else {
          popup.remove()
        } 
      
      })

      mapboxGlMap.on("load", () => {
  
        mapboxGlMap.addSource('counties', {
          type: 'vector',
          url: 'mapbox://willcarter.czkf2uey'
        })
      
        mapboxGlMap.addSource('counties_contracted_source', {
          type: 'vector',
          url: 'mapbox://willcarter.1n52p1jf'
        })
      
        mapboxGlMap.addSource('states_source', {
          type: 'vector',
          url: 'mapbox://willcarter.a5cnwnoj'
        })
      
        mapboxGlMap.addLayer({
          'id': 'states_bg',
          'source': 'states_source',
          'source-layer': 'states_albers',
          'type': 'fill',
          'paint': {
            'fill-color': '#ffffff'
          }
        })
        
        mapboxGlMap.addLayer({
          'id': 'county',
          'source': 'counties',
          'source-layer': 'counties_albers-ala1ut',
          'type': 'fill',
          'paint': {
            'fill-color': getCountyFillColors(testResults),
            'fill-outline-color': '#919191'
          }
        })
        
        mapboxGlMap.addLayer({
          'id': 'counties_contracted',
          'source': 'counties_contracted_source',
          'source-layer': 'counties_contracted_albers-cvwq37',
          'type': 'fill',
          'paint': {
            'fill-opacity': 0
          }
        })
        
        mapboxGlMap.addLayer({
          'id': 'states',
          'source': 'states_source',
          'source-layer': 'states_albers',
          'type': 'line',
          'paint': {
            'line-width': 2,
            'line-color': '#ffffff',
            'line-opacity': 1,
            'line-blur': 1
          }
        })

        const matchingTestResultsFinder = (county) => {
          return testResults.find((matchingTestResultsCounty) => {
            if(matchingTestResultsCounty.county_geoid.toString() === county.properties.geoid.toString()) {
              return matchingTestResultsCounty
            }
            return null
          })
        }

        mapboxGlMap.addSource('counties-geojson', {
          type: 'geojson',
          data: {
            type: "FeatureCollection",
            features: allCounties.features.reduce((acc, county) => {
              const match = matchingTestResultsFinder(county)
              if(match) {
                match.height = match["pct_height"]
                county.properties.height = match["pct_height"]
                acc = [...acc, county]
              }
              return acc
            },[])
          }
        })

        mapboxGlMap.addLayer({
          'id': 'county_extruded',
          'source': 'counties-geojson',
          'type': 'fill-extrusion',
          'paint': {
            'fill-extrusion-base': 0,
            'fill-extrusion-color': getCountyFillColors(testResults),
            'fill-extrusion-height': [
              'interpolate', ['linear'],
              ['get', 'height'],
              0, 0,
              1, 1000000
             ],    
            'fill-extrusion-opacity': 0
          }
        })

        handlePopup(mapboxGlMap, setCountyOfInterest, getCountyOfInterest, testResults)

        setStatefulMap(mapboxGlMap)

        console.log('mapStateful set in state')

        
        
      })
    }

    if(!statefulMap) { 
      initMap()
    }
    else {
      dispatch(clearAveragedTestResults())
      console.log('useEffect running! statefulMap or testResults must have changed.')
    }


  }, [testResults, statefulMap])

  return (
    <div id='map-container' ref={mapContainer}></div> 
  )

}  

export default Map
import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "./css/map.albers.css"

import { allCounties } from "../../data/counties_albers"
import { getCountyFillColors } from './Utilities/utils'
import ExtrudeMapControl from './controls/ExtrudeMapControl'
import ResetMapControl from './controls/ResetMapControl'
import RotateMapControl from './controls/RotateMapControl'
import LogoControl from './controls/LogoControl'
import LegendControl from './controls/LegendControl'

const Map = ({
  testResults = [],
  mapBounds = [-21, -18.25, 21, 14]// get bounding box: http://bboxfinder.com, Southwest corner, Northeast corner
}) => {
  
  const mapContainer = useRef(null)
  const [statefulMap, setStatefulMap] = useState(null)
  
  useEffect(() => {

    const initMap = () => {
    
      mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw'
  
      let center = [(mapBounds[0] + mapBounds[2]) / 2, (mapBounds[1] + mapBounds[3]) / 2]
  
      const mapboxGlMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/willcarter/ckfps2kwa01u019pp7bel1a7w`,
        center: center,
        pitch: 0,
        attributionControl: false
      })
      
      mapboxGlMap.fitBounds([
        [mapBounds[0], mapBounds[1]],
        [mapBounds[2], mapBounds[3]]
      ])
      
      mapboxGlMap.addControl(new mapboxgl.NavigationControl(), 'top-left')
      mapboxGlMap.addControl(new ExtrudeMapControl(), 'top-right')
      mapboxGlMap.addControl(new mapboxgl.FullscreenControl(), 'top-right')
      mapboxGlMap.addControl(new RotateMapControl(), 'top-right')
      mapboxGlMap.addControl(new ResetMapControl(), 'top-right')
      mapboxGlMap.addControl(new LogoControl(), 'bottom-left')
      mapboxGlMap.addControl(new LegendControl(), 'bottom-right')

      mapboxGlMap.scrollZoom.disable()
  
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
        setStatefulMap(mapboxGlMap)
        console.log('mapStateful set in state')
      })
    }

    if(!statefulMap && testResults.length > 0) { 
      initMap()
    }
    else {
      //console.log('useEffect running! statefulMap or testResults must have changed.')
    }

  }, [statefulMap, testResults, mapBounds])

  return (
    <div id='map-container' ref={mapContainer}></div> 
  )

}  

export default Map
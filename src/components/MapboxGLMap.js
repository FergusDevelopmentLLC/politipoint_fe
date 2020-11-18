import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import allCounties from "../data/counties_albers.geojson"

export const MapboxGLMap = ({
  testResults = [],
  coordinates = [-119.846, 43.862],
  zoom = 6
}) => {
  
  const countiesHandler = () => {
    let countyOfInterest
    let allCounties
    return {
      getAllCounties: () => allCounties,
      setCountyOfInterest: feature => countyOfInterest = feature,
      getCountyOfInterest: () => countyOfInterest
    }
  }
  let countyHandler = countiesHandler()

  const mapContainer = useRef(null)
  const [statefulMap, setStatefulMap] = useState(null)
  
  const initMap = () => {
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw'

    // get bounding box: http://bboxfinder.com
    let mapBounds = [-21, -18.25, 21, 14]//Southwest corner, Northeast corner

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
    
    mapboxGlMap.scrollZoom.disable()

    mapboxGlMap.on("load", () => {

      let allCounties = countyHandler.getAllCounties()

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
          'fill-color': '#ccc',
          'fill-outline-color': '#919191'
        }
      })
      
      // mapboxGlMap.addLayer({
      //   'id': 'county',
      //   'source': 'counties',
      //   'source-layer': 'counties_albers-ala1ut',
      //   'type': 'fill',
      //   'paint': {
      //     'fill-color': getCountyFillColors(testResults),
      //     'fill-outline-color': '#919191'
      //   }
      // })
      
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

  useEffect(() => {

    if(!statefulMap) { 
      initMap()
    }
    else {

    //   console.log('useEffect running! statefulMap or selectedId must have changed.')
    //   if (selectedId) {
    //     console.log(`selectedId is not null, highlight selectedId: ${selectedId}`)
    //     statefulMap.setPaintProperty('aoi-highlight', 'line-color', [
    //       'case',
    //       ['==', ['get', 'id'], selectedId],
    //       `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
    //       'rgba(0,0,0,0)'
    //     ])
    //   }
    //   else {
    //     statefulMap.setPaintProperty('aoi-highlight', 'line-color', 'rgba(0,0,0,0)')
    //   } 
    }

  }, [statefulMap])

  return (
    <div id='map-container' ref={mapContainer}></div> 
  )
}  
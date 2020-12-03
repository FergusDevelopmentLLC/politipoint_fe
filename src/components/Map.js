import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as d3 from 'd3';
import allCounties from "../data/counties_albers.geojson";

const Map = ({
  testResults = []
}) => {
  
  const mapContainer = useRef(null)
  const [statefulMap, setStatefulMap] = useState(null)
  
  useEffect(() => {

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
  
        console.log('allCounties', allCounties)
  
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
        
        let getColor = d3.scaleLinear().domain([0, 99]).range(["#ff0000", "#0015bc"])
        
        const getColorFor = (testResult) => {
    
          const total = parseFloat(testResult['economic']) 
                      + parseFloat(testResult['diplomatic'])
                      + (100 - parseFloat(testResult['civil'])) 
                      + parseFloat(testResult['societal'])
        
          const avg = total / 4
          
          return d3.color(getColor(avg)).formatHex()
        }
  
        const getCountyFillColors = (testResults) => {
          
          // we want to return an array like this to drive county color
          // let fake = [
          //   'match',
          //   ['get', 'geoid'],
          //   '19189', 
          //   'red',
          //   '20093',
          //   'purple',
          //   '21029',
          //   'green',
          //   '21063',
          //   'purple',
          //   '#ccc'//other
          // ]
          
          let countyColorArray = testResults.reduce((acc, testResult) => {
            acc = [...acc, testResult['county_geoid'], getColorFor(testResult)]
            return acc
          }, [])
          
          return ['match', ['get', 'geoid'], ...countyColorArray, '#ccc']
        
        }
  
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

  }, [statefulMap, testResults])

  return (
    <div id='map-container' ref={mapContainer}></div> 
  )

}  

export default Map
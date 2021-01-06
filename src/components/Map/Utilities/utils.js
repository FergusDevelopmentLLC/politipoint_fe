import * as d3 from 'd3'

const getColor = d3.scaleLinear().domain([0, 99]).range(["#ff0000", "#0015bc"])
        
const getColorFor = (testResult) => {

  const total = parseFloat(testResult['economic']) 
              + parseFloat(testResult['diplomatic'])
              + (100 - parseFloat(testResult['civil'])) 
              + parseFloat(testResult['societal'])

  const avg = total / 4
  
  return d3.color(getColor(avg)).formatHex()
}

export const getCountyFillColors = (testResults) => {
          
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

export const handlePopup = (map, setCountyOfInterest, getCountyOfInterest, testResults) => {

  map.on('click', 'counties_contracted', (e) => {

    setCountyOfInterest(e.features[0])

    const countyOfInterest = getCountyOfInterest()

    map.getCanvas().style.cursor = 'pointer'

    let mapContainerWidth = document.getElementById("map-container").offsetWidth

    let zoomLevel = 8
    if(mapContainerWidth < 500) zoomLevel = 6

    let match = testResults.find(tr => tr.county_geoid === countyOfInterest.properties.geoid)
    
    if (match) {
      zoomLevel = zoomLevel - 2
    }

    map.flyTo({
      center: [countyOfInterest.properties.albers_x, countyOfInterest.properties.albers_y],
      zoom: zoomLevel,
      essential: true
    })

  })

  map.on('mouseenter', 'counties_contracted', (e) => {
    map.getCanvas().style.cursor = 'pointer'
  })

}

export const showPopup = (map, countyOfInterest, testResults, popup) => {

  //let coordinates = [e.lngLat.lng, e.lngLat.lat]
  let coordinates = [countyOfInterest.properties.albers_x, countyOfInterest.properties.albers_y]
  let match = testResults.find(tr => tr.county_geoid === countyOfInterest.properties.geoid)

  let tooltip_msg = ''
  tooltip_msg += `<div class="popup-header"><strong>${countyOfInterest.properties.name} County, ${countyOfInterest.properties.state_abbrev}</strong></div>`
  tooltip_msg += `<div>`
  if (match) {

    let width = 100
    let height = 15
    let defs = `
          <defs>
            <linearGradient id="gradient">
              <stop class="blue-stop" offset="0%" />
              <stop class="red-stop" offset="100%" />
            </linearGradient>
          </defs>`

    if(match.economic) {
      tooltip_msg += 
        `
        <div class='popup-subheader'>Economic: <em>${match.economic_match}</em></div>
        <div class='popup-barheader'><div>Equality</div><div>Markets</div></div>
        <div class="bar-wrapper-map">
          <svg height="${height}" width="${width}">
            ${defs}
            <rect class="bar" width="${width}" height="${height}" />
            <line class="line" x1="${100 - match.economic}" y1="0" x2="${100 - match.economic}" y2="${height}" />
          </svg>
        </div>`
    }

    if(match.diplomatic) {
      tooltip_msg += `
        <div class='popup-subheader'>Diplomatic: <em>${match.diplomatic_match}</em></div>
        <div class='popup-barheader'><div>World</div><div>Nation</div></div>
        <div class="bar-wrapper-map">
          <svg height="${height}" width="${width}">
            ${defs}
            <rect class="bar" width="${width}" height="${height}" />
            <line class="line" x1="${100 - match.diplomatic}" y1="0" x2="${100 - match.diplomatic}" y2="${height}" />
          </svg>
        </div>`
    }
    
    if(match.civil) {
      tooltip_msg += `
        <div class='popup-subheader'>Civil: <em>${match.civil_match}</em></div>
        <div class='popup-barheader'><div>Authority</div><div>Liberty</div></div>
        <div class="bar-wrapper-map">
          <svg height="${height}" width="${width}">
            ${defs}
            <rect class="bar" width="${width}" height="${height}" />
            <line class="line" x1="${match.civil}" y1="0" x2="${match.civil}" y2="${height}" />
          </svg>
        </div>`
    }
    
    if(match.societal) {
      tooltip_msg += `
        <div class='popup-subheader'>Societal: <em>${match.societal_match}</em></div>
        <div class='popup-barheader'><div>Progress</div><div>Tradition</div></div>
        <div class="bar-wrapper-map">
          <svg height="${height}" width="${width}">
            ${defs}
            <rect class="bar" width="${width}" height="${height}" />
            <line class="line" x1="${100 - match.societal}" y1="0" x2="${100 - match.societal}" y2="${height}" />
          </svg>
        </div>`
    }
    
    tooltip_msg += `<div class='popup-subheader'>Ideology: <em><a href='/results?e=${match.economic.toFixed(2)}&d=${match.diplomatic.toFixed(2)}&c=${match.civil.toFixed(2)}&s=${match.societal.toFixed(2)}'>${match.ideology_match_name}</a></em></div>`

  }
  else {
    tooltip_msg += `<div class="popup-subheader">No test results</div>`
  }
  tooltip_msg += `<div>`

  // Populate the popup and set its coordinates based on the feature found.
  popup.setLngLat(coordinates)
    .setHTML(tooltip_msg)
    .addTo(map)

}
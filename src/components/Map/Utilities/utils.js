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
import React from "react"

export const Continuum = ({
  type = 'economic',
  flip = false,
  value = 50,
  linePosition = 100,
  width = 200,
  height = 50,
  match = ''
}) => {

  //yuck
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  if (width > 0) { height = .05 * width }
  if (width < 450) { height = .15 * width }

  let leftPercent = (value * 100) / 100
  let rightPercent = (100 - ((value * 100) / 100))

  if(flip) {
    leftPercent = 100 - leftPercent
    rightPercent = 100 - rightPercent
    value = 100 - value
  }

  let leftPercentText = ''
  let rightPercentText = ''
  if (leftPercent > rightPercent) leftPercentText = `${leftPercent.toFixed(0)}%`
  if (rightPercent > leftPercent) rightPercentText = `${rightPercent.toFixed(0)}%`
  if (rightPercent === leftPercent) {
      rightPercentText = `${rightPercent.toFixed(0)}%`
      leftPercentText = `${leftPercent.toFixed(0)}%`
  }

  let leftImg = ''
  let rightImg = ''

  if(type === 'economic') {
    leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603471674/politipoint/axis/equality_n7pfnb.png'
    rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/markets_nivxqb.png'
  }
  else if (type === 'diplomatic') {
    leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/world_gsftlk.png'
    rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/nation_ovlorq.png'
  }
  else if (type === 'civil') {
    leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/authority_ymkmvq.png'
    rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/liberty_cmq4hm.png'
  }
  else if (type === 'societal') {
    leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/progress_ygaeoo.png'
    rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/tradition_lgt21n.png'
  }

  linePosition = (value * width) / 100

  return (
    <div className="results-continuum">
      <h2>{ type.toProperCase() }: <span className="weight-300">{ match }</span></h2>
      <div className="axis">
        <div className="results-img-wrapper">
          <img className="result-axis-image" src={ leftImg } />
        </div>
        <div className="bar-wrapper">
          <svg viewBox={`0 0 ${ width } ${ height }`}>
            <defs>
              <linearGradient id="gradient">
                <stop className="blue-stop" offset="0%"></stop>
                <stop className="red-stop" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g>
              <rect className="bar" width={ width } height={ height }></rect>
              <line className="line" x1={ linePosition } y1="0" x2={ linePosition } y2={ height }></line>
              <text x={ (width * .01) } y={ height - (.35 * height)} className="bar-text">{ leftPercentText }</text>
              <text x={ width - (width * .01) } y={ height - (.35 * height)} className="bar-text" textAnchor="end">{ rightPercentText }</text>
            </g>
          </svg>
        </div>
        <div className="results-img-wrapper">
          <img className="result-axis-image" src={ rightImg } />
        </div>
      </div>
    </div>
  )
}
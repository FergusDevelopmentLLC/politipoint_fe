import React, { Component, Fragment } from 'react'

class Continuum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      flip: this.props.flip,
      width: 200,
      height: 50,
      lineValue: this.props.value,
      linePosition: 100,
      leftPercentText: '',
      rightPercentText: '',
      imageLeft: 'https://res.cloudinary.com/fergusdev/image/upload/v1603471674/politipoint/axis/equality_n7pfnb.png',
      imageRight: 'https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/markets_nivxqb.png'
    }
  }

  componentDidMount() {
    
    this.setState((previousState) => {
      
      let height = previousState.height
      if (previousState.width > 0) { height = .05 * previousState.width }
      if (previousState.width < 450) { height = .15 * previousState.width }
      
      let leftPercent = (previousState.lineValue * 100) / 100
      let rightPercent = (100 - ((previousState.lineValue * 100) / 100))

      if(previousState.flip) {
        leftPercent = 100 - leftPercent
        rightPercent = 100 - rightPercent
      }

      let leftPercentText = ''
      let rightPercentText = ''
      if (leftPercent > rightPercent) leftPercentText = `${leftPercent.toFixed(0)}%`
      if (rightPercent > leftPercent) rightPercentText = `${rightPercent.toFixed(0)}%`
      if (rightPercent === leftPercent) {
        rightPercentText = `${rightPercent.toFixed(0)}%`
        leftPercentText = `${leftPercent.toFixed(0)}%`
      }

      let lineValue = previousState.flip ? (100 - previousState.lineValue) : previousState.lineValue

      let leftImg = previousState.imageLeft
      let rightImg = previousState.imageRight

      if(previousState.type === 'economic') {
        leftImg = previousState.imageLeft
        rightImg = previousState.imageRight
      }
      else if (previousState.type === 'diplomatic') {
        leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/world_gsftlk.png'
        rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/nation_ovlorq.png'
      }
      else if (previousState.type === 'civil') {
        leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/authority_ymkmvq.png'
        rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/liberty_cmq4hm.png'
      }
      else if (previousState.type === 'societal') {
        leftImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/progress_ygaeoo.png'
        rightImg = 'https://res.cloudinary.com/fergusdev/image/upload/v1603210184/politipoint/axis/tradition_lgt21n.png'
      }

      return {
        ...previousState,
        height: height,
        lineValue: lineValue,
        leftPercentText: leftPercentText,
        rightPercentText: rightPercentText,
        linePosition: (lineValue * previousState.width) / 100,
        imageLeft: leftImg,
        imageRight: rightImg
      }
    })
  }

  render() {
    
    //yuck
    String.prototype.toProperCase = function () {
      return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    return <div className="results-continuum">
  <h2>{ this.state.type.toProperCase() }: <span className="weight-300">{ this.props.match }</span></h2>
      <div className="axis">
        <div className="results-img-wrapper">
          <img className="result-axis-image" src={ this.state.imageLeft } />
        </div>
        <div className="bar-wrapper">
          <svg viewBox={`0 0 ${this.state.width} ${ this.state.height }`}>
            <defs>
              <linearGradient id="gradient">
                <stop className="blue-stop" offset="0%"></stop>
                <stop className="red-stop" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g>
              <rect className="bar" width={ this.state.width } height={ this.state.height }></rect>
              <line className="line" x1={ this.state.linePosition } y1="0" x2={ this.state.linePosition } y2={ this.state.height }></line>
              <text x={ (this.state.width * .01) } y={ this.state.height - (.35 * this.state.height)} className="bar-text">{ this.state.leftPercentText }</text>
              <text x={ this.state.width - (this.state.width * .01) } y={this.state.height - (.35 * this.state.height)} className="bar-text" textAnchor="end">{ this.state.rightPercentText }</text>
            </g>
          </svg>
        </div>
        <div className="results-img-wrapper">
          <img className="result-axis-image" src={ this.state.imageRight } />
        </div>
      </div>
    </div>
  }

}

export default Continuum

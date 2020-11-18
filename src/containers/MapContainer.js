import React, { Component, Fragment } from 'react'
import { MapboxGLMap } from '../components/MapboxGLMap'

class MapContainer extends Component {
  constructor(props) {
    super(props)
    // this.state = {}
  }

  async componentDidMount() {

  }

  render() {

    return <div class="map-wrapper">
      <MapboxGLMap />
    </div>


  }
}

export default MapContainer
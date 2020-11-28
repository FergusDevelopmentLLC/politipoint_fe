import React, { Component, Fragment } from 'react'
import { HeaderLogo }  from "../components/HeaderLogo"
import { URL_PREFIX } from '../actions/urlPrefix'

class IdeologiesContainer extends Component {
  constructor() {
    super()
    this.state = {
      ideologies: []
    }
  }

  async componentDidMount () {
    const ideologies = await fetch(`${ URL_PREFIX }/ideologies`).then(r => r.json())
    this.setState((previousState) => {
      return {
        ...previousState,
        ideologies: ideologies
      }
    })
  }
  
  render() {
    
    return (
      <Fragment>
        <HeaderLogo />
        <dl>
        { 
          this.state.ideologies.map((ideology) => {
            return <Fragment key={ `${ideology.id}` } >
                   <dt key={ `dt_${ideology.id}` }>{ ideology.name }</dt>
                   <dd key={ `dd_${ideology.id}` }>{ ideology.definition }</dd>
                   </Fragment>
          })}
        </dl>
      </Fragment>
    )
  }
}
export default IdeologiesContainer
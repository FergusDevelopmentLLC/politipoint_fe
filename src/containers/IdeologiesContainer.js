import React, { Component, Fragment } from 'react'
import { HeaderLogo }  from "../components/HeaderLogo"

class IdeologiesContainer extends Component {
  constructor() {
    super()
    this.state = {
      ideologies: []
    }
  }

  getIdeologies = async () => {
    return await fetch(`${ this.props.urlPrefix }/ideologies`).then(r => r.json())
  }

  async componentDidMount () {
    
    let ideologies = await this.getIdeologies()
    
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
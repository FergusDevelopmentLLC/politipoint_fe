import React, { Fragment } from 'react'

const Ideologies = ({
  ideologies
}) => {
  return (
    <dl>
      { 
        ideologies.map((ideology) => {
          return  <Fragment key={ `${ideology.id}` } >
                    <dt key={ `dt_${ideology.id}` }>{ ideology.name }</dt>
                    <dd key={ `dd_${ideology.id}` }>{ ideology.definition }</dd>
                  </Fragment>
          })
      }
    </dl>
  )
}

export default Ideologies

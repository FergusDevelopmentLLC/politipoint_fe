import React, { Fragment } from "react"

export const HeaderLogoSkinny = ({
  version = 2
}) => {

  return (
    <Fragment>
    <div className='quiz-logo-wrapper'>
      <img alt='Politipoint' src="https://res.cloudinary.com/fergusdev/image/upload/v1602701055/politipoint/logos/politipoint-wordmark-color_ewmxr1.png" />
    </div>
    <h5>Version: { version }</h5>
    <hr />
    </Fragment>
  )
}





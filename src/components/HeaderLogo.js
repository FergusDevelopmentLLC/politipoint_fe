import React from "react"

export const HeaderLogo = ({
  version = 2
}) => {
  
  return (
    <div className="logo-wrapper">
      <img alt="Politipoint.org" src="https://res.cloudinary.com/fergusdev/image/upload/v1602701054/politipoint/logos/politipoint-vertical-color_txkgp9.png" title="PolitiPoint.org"></img>
      <h6><span id="version">Version: { version }</span></h6>
    </div>
  )
}
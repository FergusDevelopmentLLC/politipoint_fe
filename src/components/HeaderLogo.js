import React from "react"

export const HeaderLogo = ({
  version = null,
  isSkinny = false
}) => {
  
  const getVersionText = () => {
    if(version){
      return <h6><span id="version">Version: { version }</span></h6>
    }
    else return null
  }

  const getImgSource = () => {
    if(isSkinny){
      return `https://res.cloudinary.com/fergusdev/image/upload/v1602701055/politipoint/logos/politipoint-wordmark-color_ewmxr1.png`
    }
    return `https://res.cloudinary.com/fergusdev/image/upload/v1602701054/politipoint/logos/politipoint-vertical-color_txkgp9.png`
  }
  
  return (
    <div className="logo-wrapper">
      <img alt="Politipoint.org" src={ getImgSource() } title="PolitiPoint.org"></img>
      { getVersionText() }
    </div>
  )
}
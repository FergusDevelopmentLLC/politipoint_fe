import React from "react"

export const Blurb = ({
  headerText = '',
  htmlContent=''
}) => {
  
  return (
    <div className="blurb-wrapper">
      <h2>{ headerText }</h2>
      <span dangerouslySetInnerHTML={{ __html: htmlContent }}></span>
    </div>
  )
}
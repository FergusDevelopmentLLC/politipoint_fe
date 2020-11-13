import React, { Component, Fragment } from 'react'

class Blurb extends Component {
  render() {
    return (
      <div className="blurb-wrapper">
        <h2>{this.props.headerText}</h2>
        <span dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}></span>
      </div>
    )
  }
}

Blurb.defaultProps = {
  headerText: 'Header text',
  htmlContent: `<p>content</p>`
}

export default Blurb

import React, { Component, Fragment } from 'react'

class Blurb extends Component {
  render() {
    return (
      <Fragment>
        <h2>{this.props.headerText}</h2>
        <span dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}></span>
      </Fragment>
    )
  }
}

Blurb.defaultProps = {
  headerText: 'Header Text',
  htmlContent: `<p>html content</p>`
}

export default Blurb

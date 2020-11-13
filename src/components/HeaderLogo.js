import React, { Component } from 'react';

class HeaderLogo extends Component {

  render() {

    return  <React.Fragment>
            <div className='logo-wrapper'>
              <img alt='Politipoint.org' src='https://res.cloudinary.com/fergusdev/image/upload/v1602701054/politipoint/logos/politipoint-vertical-color_txkgp9.png' title='PolitiPoint.org' />
            </div>
            <h6><span id="version">Version: { this.props.version.toString() }</span></h6>
            </React.Fragment>
  }
}

HeaderLogo.defaultProps = {
  version: 2
}

export default HeaderLogo


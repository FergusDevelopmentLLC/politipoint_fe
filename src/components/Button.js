import React, { Component } from 'react';

class Button extends Component {

  render() {

    return  <div className="home-button-wrapper">
                <button className="button button-home" >{ this.props.buttonText }</button>
            </div>
            
  }
}

Button.defaultProps = {
  buttonText: 'Click/tap here to begin'
}

export default Button


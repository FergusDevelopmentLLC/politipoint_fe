import React, { Component } from 'react';

class Button extends Component {

  render() {

    return  <div className="button-wrapper">
                <button className="button" >{ this.props.buttonText }</button>
            </div>
            
  }
}

Button.defaultProps = {
  buttonText: 'Click/tap here to begin'
}

export default Button


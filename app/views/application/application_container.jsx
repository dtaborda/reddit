import React, { Component, PropTypes } from 'react';

export default class ApplicationContainer extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

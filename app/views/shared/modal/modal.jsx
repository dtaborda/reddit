import React, { Component, PropTypes } from 'react';

import styles from './modal.scss';

export default class Modal extends Component {
  static get propTypes() {
    return {
      children: PropTypes.element.isRequired,
      isOpen: PropTypes.bool
    };
  }

  static defaultProps = {
    isOpen: true
  }

  render() {
    if (this.props.isOpen) {
      return (
        <div className={styles.content}>
          <h2>modal</h2>
          <div>
            {this.props.children}
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

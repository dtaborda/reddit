import React, { Component, PropTypes } from 'react';
import WebLayout from 'views/shared/layout/web_layout/';

import styles from './damian.scss';


export default class Damian extends Component {
  static get propTypes() {
    return {
      onGoToProfile: PropTypes.func
    };
  }

  render() {
    return (
      <WebLayout
        showSearch={false}
        onGoToProfile={this.props.onGoToProfile}
      >
        <h1 className={styles.title}>Damian</h1>
      </WebLayout>
    );
  }
}

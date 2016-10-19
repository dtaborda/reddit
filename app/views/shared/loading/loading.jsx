import React, { Component } from 'react';
import loading from 'assets/images/loader.gif';

import styles from './loading.scss';

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.content}>
        <img src={loading}/>
      </div>
    );
  }
}

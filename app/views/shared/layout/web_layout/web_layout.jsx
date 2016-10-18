import React, { Component, PropTypes } from 'react';
import Header from 'views/shared/layout/header/';

import styles from './web_layout.scss';

export default class WebLayout extends Component {
  static get propTypes() {
    return {
      children: PropTypes.element.isRequired,
      showSearch: Header.propTypes.showSearch,
      onGoToProfile: Header.propTypes.onGoToProfile,
      onSearchAction: Header.propTypes.onSearchAction
    };
  }

  static defaultProps = {
    showSearch: true
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          <Header
            className={styles.header}
            showSearch={this.props.showSearch}
            onGoToProfile={this.props.onGoToProfile}
            onSearchAction={this.props.onSearchAction}
          />
        </div>
        <div className={styles.body}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

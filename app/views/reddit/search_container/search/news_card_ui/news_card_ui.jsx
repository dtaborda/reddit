import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import mailLogo from 'assets/images/unknown.png';

import styles from './news_card_ui.scss';

export default class NewsCardUI extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      numComments: PropTypes.number.isRequired,
      ups: PropTypes.number.isRequired,
      downs: PropTypes.number.isRequired
    };
  }

  render() {
    const thumbnailValue = this.props.thumbnail === '' ? mailLogo : this.props.thumbnail;
    return (
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img className={styles.thumbnail} src={thumbnailValue} />
        </div>
        <div className={styles.infoContainer}>
          <h3 className={styles.author}>{this.props.author}</h3>
          <p className={styles.title}>{this.props.title}</p>
          <div className={styles.iconsContent}>
            <div className={styles.iconContainer}>
              <span className={styles.icon}></span>
              <span className={styles.value}>{this.props.numComments} comments</span>
            </div>
            <div className={styles.iconContainer}>
              <span className={classNames(styles.icon, styles.upsIcons)}></span>
              <span className={styles.value}>{this.props.ups} ups</span>
            </div>
            <div className={styles.iconContainer}>
              <span className={classNames(styles.icon, styles.downsIcons)}></span>
              <span className={styles.value}>{this.props.downs} downs</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

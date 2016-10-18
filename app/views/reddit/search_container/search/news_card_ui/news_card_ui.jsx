import React, { Component, PropTypes } from 'react';
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
    return (
      <div className={styles.content}>
        <div>{this.props.title}</div>
        <div>{this.props.author}</div>
        <img src={this.props.thumbnail} />
        <div>{this.props.numComments}</div>
        <div>{this.props.ups}</div>
        <div>{this.props.downs}</div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NewsInfoDragUI from './news_info_drag_ui';
import ReeditDropUI from './reddit_drop_ui';
import redditLogo from 'assets/images/reddit-logo.png';
import mailLogo from 'assets/images/mail-logo.png';

import styles from './news_card_drag_and_drop.scss';


function addClassName(el, className) {
  const classes = el.className.split(' ');
  if (classes.indexOf(className) === -1) {
    el.className = classes.concat(className).join('');
  }
}

function removeClassName(el, className) {
  const classes = el.className.split(' ');
  el.className = classes.filter((c) => c !== className).join('');
}

@DragDropContext(HTML5Backend)
export default class NewsCardDragAndDrop extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      numComments: PropTypes.number.isRequired,
      ups: PropTypes.number.isRequired,
      downs: PropTypes.number.isRequired,
      permalink: PropTypes.string.isRequired,
      showModal: PropTypes.bool,
      onClose: PropTypes.func
    };
  }

  handleClose() {
    removeClassName(document.body, styles.bodyWithOpenModal);
    this.props.onClose();
  }

  handleRedditRedirect() {
    const redditPost = `https://www.reddit.com${this.props.permalink}`;
    return redditPost;
  }

  handleEmailRedirect() {
    const redditPost = `https://www.reddit.com${this.props.permalink}`;
    const email = 'mailto:dummy@test.com?subject=Checkout this Reddit post&body=' + redditPost;
    return email;
  }

  render() {
    const { props } = this;

    if (this.props.title) {
      addClassName(document.body, styles.bodyWithOpenModal);
    }

    return (
      <div className={styles.content} onClick={this.handleClose.bind(this)}>
        <div className={styles.newsContent}>
          <div className={styles.newsItem}>
            <NewsInfoDragUI
              title={props.title}
              author={props.author}
              thumbnail={props.thumbnail}
              numComments={props.numComments}
              ups={props.ups}
              downs={props.downs}
              permalink={props.permalink}
            />
          </div>
          <div className={styles.textItem}>
            <p>Drag the card on the left to the desired action</p>
          </div>
          <div className={classNames(styles.newsItem, styles.icons)}>
            <ReeditDropUI
              logo={redditLogo}
              onRedirect={this.handleRedditRedirect.bind(this)}
              title="Opend on Reddit"
            />
            <ReeditDropUI
              logo={mailLogo}
              onRedirect={this.handleEmailRedirect.bind(this)}
              title="Email to a friend"
            />
          </div>
        </div>
      </div>
    );
  }
}

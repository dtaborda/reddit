import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ItemTypes from 'views/reddit/search_container/search/news_card_drag_and_drop/item_types';
import { DragSource } from 'react-dnd';
import mailLogo from 'assets/images/unknown.png';

import styles from './news_info_ui.scss';


const boxSource = {
  beginDrag(props) {
    return {
      name: props.title
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.open(dropResult.url, '_blank');
    }
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class NewsInfoUI extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      numComments: PropTypes.number.isRequired,
      ups: PropTypes.number.isRequired,
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired
    };
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0 : 1;
    const thumbnailValue = this.props.thumbnail === '' ? mailLogo : this.props.thumbnail;
    return (
      connectDragSource(
        <div style={{ opacity }} className={styles.content}>
          <img className={styles.thumbnail} src={thumbnailValue} />
          <div className={styles.author}>{this.props.author}</div>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.iconsContent}>
            <div className={styles.iconContainer}>
              <span className={styles.icon}></span>
              <span className={styles.value}>{this.props.numComments}</span>
            </div>
            <div className={styles.iconContainer}>
              <span className={classNames(styles.icon, styles.upsIcons)}></span>
              <span className={styles.value}>{this.props.ups}</span>
            </div>
          </div>
        </div>
      )
    );
  }
}

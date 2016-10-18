import React, { Component, PropTypes } from 'react';
import ItemTypes from 'views/reddit/search_container/search/news_card_drag_and_drop/item_types';
import { DragSource } from 'react-dnd';

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
      downs: PropTypes.number.isRequired,
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired
    };
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragSource(
        <div style={{ opacity }} className={styles.content}>
          <div>{this.props.title}</div>
          <div>{this.props.author}</div>
          <img src={this.props.thumbnail} />
          <div>{this.props.numComments}</div>
          <div>{this.props.ups}</div>
          <div>{this.props.downs}</div>
        </div>
      )
    );
  }
}

import React, { Component, PropTypes } from 'react';
import ItemTypes from 'views/reddit/search_container/search/news_card_drag_and_drop/item_types';
import { DropTarget } from 'react-dnd';

import styles from './reddit_ui.scss';

const boxTarget = {
  drop(props, monitor) {
    return {
      url: props.onRedirect()
    };
  }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class ReeditUI extends Component {
  static get propTypes() {
    return {
      connectDropTarget: PropTypes.func.isRequired,
      isOver: PropTypes.bool.isRequired,
      canDrop: PropTypes.bool.isRequired,
      logo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    };
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let border = '1px solid white';
    if (isActive) {
      border = '1px solid blue';
    } else if (canDrop) {
      border = '1px solid white';
    }

    return connectDropTarget(
      <div style={{ border }} className={styles.content}>
        <img src={this.props.logo} />
        <h4>{this.props.title}</h4>
      </div>
    );
  }
}

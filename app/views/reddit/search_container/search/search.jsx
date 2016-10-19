import React, { Component, PropTypes } from 'react';
import WebLayout from 'views/shared/layout/web_layout/';
import Loading from 'views/shared/loading/';
import NewsCardUI from './news_card_ui';
import NewsCarDragAndDrop from './news_card_drag_and_drop';

import styles from './search.scss';


export default class Search extends Component {
  static get propTypes() {
    return {
      onGoToProfile: PropTypes.func,
      redditNews: PropTypes.object,
      gettingRedditNews: PropTypes.bool,
      onGetRedditNews: PropTypes.func.isRequired,
      onSetNewCurrent: PropTypes.func.isRequired,
      onDeleteCurrent: PropTypes.func.isRequired,
      current: PropTypes.object,
      showMessage: PropTypes.string
    };
  }


  handrleSetNewCurrent(newCurrent) {
    this.props.onSetNewCurrent(
      {
        title: newCurrent.title,
        author: newCurrent.author,
        thumbnail: newCurrent.thumbnail,
        numComments: newCurrent.num_comments,
        ups: newCurrent.ups,
        downs: newCurrent.downs,
        permalink: newCurrent.permalink
      }
    );
  }

  renderLoading() {
    if (this.props.gettingRedditNews) {
      return <Loading />;
    }
  }
  renderRedditContent() {
    if (this.props.redditNews && this.props.redditNews.data) {
      const redditNewsColection = this.props.redditNews.data.children.map((item, index) => {
        const { data } = item;
        return (
          <div key={index} onClick={this.handrleSetNewCurrent.bind(this, data)}>
            <NewsCardUI
              title={data.title}
              author={data.author}
              thumbnail={data.thumbnail}
              numComments={data.num_comments}
              ups={data.ups}
              downs={data.downs}
              permalink={data.permalink}
            />
          </div>
        );
      });
      return redditNewsColection;
    }
  }

  renderMessage() {
    if (this.props.showMessage) {
      return (
        <div className={styles.messageContent}>
          <p>{this.props.showMessage}</p>
        </div>
      );
    }
    return null;
  }

  renderShowCurrent() {
    if (this.props.current) {
      const { current } = this.props;
      return (
        <NewsCarDragAndDrop
          title={current.title}
          author={current.author}
          thumbnail={current.thumbnail}
          numComments={current.numComments}
          ups={current.ups}
          downs={current.downs}
          permalink={current.permalink}
          onClose={this.props.onDeleteCurrent}
        />
      );
    }
  }

  render() {
    return (
      <WebLayout
        onGoToProfile={this.props.onGoToProfile}
        onSearchAction={this.props.onGetRedditNews}
      >
        <div className={styles.content}>
          {this.renderLoading()}
          {this.renderMessage() ? this.renderMessage() : this.renderRedditContent()}
          {this.renderShowCurrent()}
        </div>
      </WebLayout>
    );
  }
}

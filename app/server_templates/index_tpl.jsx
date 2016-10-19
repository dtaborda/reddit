import React, { Component, PropTypes } from 'react';
import MainLayout from './layouts/main_layout';
import Helmet from 'react-helmet';
import config from 'config';

export default class IndexTemplate extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      router: PropTypes.string.isRequired,
      assets: PropTypes.object.isRequired
    };
  }

  renderContent() {
    return (<div>
      <Helmet {...config.app.head} />
      <Helmet title={this.props.title} />
      <script dangerouslySetInnerHTML={{ __html: `window.__router='${this.props.router}';` }} charSet='UTF-8'/>
      {
        this.props.assets.scripts.map((scriptUrl, index) => {
          return (
            <script key={index} type='text/javascript' src={scriptUrl} charSet='UTF-8' />
          );
        })
      }
    </div>);
  }

  render() {
    return (
      <MainLayout
        title={this.props.title}
        styleLinks={this.props.assets.styleLinks}
        content={this.renderContent()}
      />
    );
  }
}

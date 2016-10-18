import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';

export default class MainLayout extends Component {

  static get propTypes() {
    return {
      title: PropTypes.string,
      content: PropTypes.node
    };
  }

  render() {
    const content = ReactDOM.renderToStaticMarkup(this.props.content);
    const head = Helmet.rewind();
    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' rel='stylesheet' integrity='sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1' crossOrigin='anonymous' />
        </head>
        <body>
          <div id='application' dangerouslySetInnerHTML={{ __html: content }}/>
        </body>
      </html>
    );
  }
}

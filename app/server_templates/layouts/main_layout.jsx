import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';

export default class MainLayout extends Component {

  static get propTypes() {
    return {
      title: PropTypes.string,
      content: PropTypes.node,
      styleLinks: PropTypes.array
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
          <link href="https://fonts.googleapis.com/css?family=Exo" rel="stylesheet" />
          {
            this.props.styleLinks.map((styleUrl, index) => {
              return (
                <link key={index} rel='stylesheet' href={styleUrl} charSet='UTF-8' />
              );
            })
          }
        </head>
        <body>
          <div id='application' dangerouslySetInnerHTML={{ __html: content }}/>
        </body>
      </html>
    );
  }
}

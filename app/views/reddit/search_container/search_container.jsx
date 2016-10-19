import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Search from './search';
import { getRedditSchema } from 'action_creators/reddit_action_creator';

const select = (state) => ({
  gettingRedditSchema: state.reddit.gettingRedditSchema,
  redditSchemaError: state.reddit.redditSchemaError,
  redditSchema: state.reddit.redditSchema
});

@connect(select)
export default class RedditSearchContainer extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      redditSchema: Search.propTypes.redditNews,
      gettingRedditSchema: PropTypes.bool,
      redditSchemaError: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      current: null,
      showMessage: null
    };
  }

  componentWillMount() {
    this.handleGetRedditSchema('funny');
  }

  handrleSetNewCurrent(newCurrent) {
    this.setState({ current: newCurrent });
  }

  handrleDeleteCurrent() {
    this.setState({ current: null });
  }

  handleGetRedditSchema(nameSchema) {
    if (nameSchema !== '') {
      const { dispatch } = this.props;
      dispatch(getRedditSchema(nameSchema)).then((response)=>{
        if (this.props.redditSchemaError) {
          return this.setState({ showMessage: 'No result found !!!' });
        }
        return this.setState({ showMessage: null });
      });
    } else {
      this.setState({ showMessage: 'Please input a search term' });
    }
  }


  handleGoToProfile() {
    window.open('https://www.reddit.com', '_blank');
  }

  render() {
    return (
      <Search
        redditNews={this.props.redditSchema.asMutable({ deep: true })}
        gettingRedditNews={this.props.gettingRedditSchema}
        onGoToProfile={this.handleGoToProfile.bind(this)}
        onGetRedditNews={this.handleGetRedditSchema.bind(this)}
        onSetNewCurrent={this.handrleSetNewCurrent.bind(this)}
        onDeleteCurrent={this.handrleDeleteCurrent.bind(this)}
        current={this.state.current}
        showMessage={this.state.showMessage}
      />
    );
  }
}

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
      gettingRedditSchema: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      current: null
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
    const { dispatch } = this.props;
    dispatch(getRedditSchema(nameSchema));
  }


  handleGoToProfile() {
    browserHistory.push('/damian');
  }

  render() {
    return (
      <Search
        redditNews={this.props.redditSchema.asMutable({ deep: true })}
        onGoToProfile={this.handleGoToProfile.bind(this)}
        onGetRedditNews={this.handleGetRedditSchema.bind(this)}
        onSetNewCurrent={this.handrleSetNewCurrent.bind(this)}
        onDeleteCurrent={this.handrleDeleteCurrent.bind(this)}
        current={this.state.current}
      />
    );
  }
}

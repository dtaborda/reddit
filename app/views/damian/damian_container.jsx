import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Damian from './damian';

export default class DamianContainer extends Component {
  handleGoToProfile() {
    browserHistory.push('/reddit');
  }

  render() {
    return (
      <Damian onGoToProfile={this.handleGoToProfile.bind(this)}/>
    );
  }
}

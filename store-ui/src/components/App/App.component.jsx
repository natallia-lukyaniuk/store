import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class App extends Component {
  render() {
    return (
      <div className="app">
        dajdaj
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
  }),
)(App);

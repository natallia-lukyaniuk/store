import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div>
        App
      </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { users } = state;
  return {
    users,
  };
}

export default connect(mapStateToProps)(App);

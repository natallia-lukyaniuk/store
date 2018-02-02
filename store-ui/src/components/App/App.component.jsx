import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard/Dashboard.component';
import Login from '../Login/Login.component';
import AuthService from '../../utils/auth.service';


class App extends React.Component {
  render() {
    return AuthService.getToken() ? <Dashboard /> : <Login />;
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(App);

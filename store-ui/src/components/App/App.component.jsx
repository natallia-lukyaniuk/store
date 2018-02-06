import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard/Dashboard.component';
import Login from '../Login/Login.component';
import AuthService from '../../utils/auth.service';
import withAuth from '../withAuth';
import { Link } from 'react-router-dom';

const Auth = new AuthService();

class App extends React.Component {
  handleLogout() {
    Auth.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome {this.props.user.username}</h2>
        </div>
        <p className="App-intro">
          <button
            type="button"
            className="form-submit"
            onClick={this.handleLogout.bind(this)}>
            Logout
          </button>
        </p>
        <Link to={'/dashboard'}>Dashboard</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(withAuth(App));

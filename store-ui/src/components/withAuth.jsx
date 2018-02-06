import React, { Component } from 'react';
import AuthService from '../utils/auth.service';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService('http://localhost:8000');
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const profile = Auth.getProfile();
          console.log('sdf');
          this.setState({
            user: profile,
          });
        }
        catch (err) {
          // Auth.logout();
          // this.props.history.replace('/login');
        }
      }
    }

    render() {
      return this.state.user
        ? <AuthComponent history={this.props.history} user={this.state.user} />
        : null;
    }
  };
}

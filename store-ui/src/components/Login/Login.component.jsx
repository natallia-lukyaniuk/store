import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './login.component.scss';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <form className="form" >
          <label>Login
            <input className="form__field" type="text"/>
            </label>
          <label>Password<input className="form__field" type="password" /></label>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Login);

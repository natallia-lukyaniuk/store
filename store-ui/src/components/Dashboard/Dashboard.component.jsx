import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './dashboard.component.scss';
import withAuth from '../withAuth';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        Dashboard
      </div>
    );
  }
}

Dashboard.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(withAuth(Dashboard));

import React, { Component } from 'react';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render() {
    return (
      <>
        <NavLink onClick={this.props.logout} href="/login">
          Logout
        </NavLink>
      </>
    )
  }
}

export default connect(null, { logout })(Logout)

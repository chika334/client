import React, { Component, Fragment } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import logo from '../images/logo.jpeg';
import Logout from '../pages/Logout';
import PropTypes from 'prop-types';

class NavBar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>
              {user ? `Welcome ${user.firstname}` : ''}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLink = (
      <Fragment>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Fragment>
    );
    return (
      <div className="ml-4">
        <Navbar expand='sm'>
          <NavbarBrand href="#home">
            <img src={logo} className="img" />
              Flit Chat
            </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse id="basic-navbar-nav" isOpen={this.state.isOpen} navbar>
            <Nav className="navlink mr-5" navbar>
              {isAuthenticated ? authLinks : guestLink}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(NavBar);
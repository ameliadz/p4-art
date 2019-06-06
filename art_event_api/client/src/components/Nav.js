import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/venues">All Venues</Link>
        {this.props.loggedIn ? <Link to="/account">My Account</Link> : <Link to="/login">Log In</Link>}
      </nav>
    )
  }
}

export default Nav;

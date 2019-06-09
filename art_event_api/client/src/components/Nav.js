import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/events">All Events</NavLink>
        <NavLink to="/venues">All Venues</NavLink>
        { this.props.user_id ? <NavLink to="/account">My Account</NavLink> : <NavLink to="/login">Log In</NavLink> }
      </nav>
    )
  }
}

export default Nav;

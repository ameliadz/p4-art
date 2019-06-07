import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AccountPage extends Component {
  render() {
    const owner = this.props.user;
    console.log(owner)
    return (
      <div>
        { owner ?
          <div className="account dashboard">
            <h2>Welcome, {owner.first_name} {owner.last_name}</h2>
            <button onClick={this.props.handleLogout}>Log Out</button>
            <div className="owner-venues">
              <p>Your Venues:</p>
              <ul>
                {owner.venues.map(venue => <li key={venue.id}><Link to={`/venues/${venue.id}`}>{venue.name}</Link> - {venue.category}
                  <p>{venue.address}</p>
                  </li>)}
              </ul>
            </div>
          </div>
          :
          <div>
            <p>Error: not logged in</p>
          </div> }
      </div>
    )
  }
}

export default AccountPage

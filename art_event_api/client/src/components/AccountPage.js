import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VenueForm from './VenueForm';
import decode from 'jwt-decode';
import { getUser } from '../services/apiHelper';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVenue: false,
      addEvent: false
    }
    this.createVenue = this.createVenue.bind(this);
    this.newVenue = this.newVenue.bind(this);
  }

  async componentDidMount() {
    const checkUser = localStorage.getItem("jwt")
    if (checkUser) {
      const currentUser = decode(checkUser);
      const user = await getUser(checkUser, currentUser.venue_owner_id);
      await this.setState({
        user: user
      });
    }
  }

  createVenue = () => {
    this.setState({
      addVenue: true
    })
  }

  newVenue = (e) => {
    e.preventDefault();
    this.props.addVenue();
    this.setState({
      addVenue: false
    })
  }

  render() {
    const owner = this.state.user;
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
              { this.state.addVenue ?
                <form onSubmit={this.newVenue}>
                  <VenueForm handleDaySelect={this.props.handleDaySelect} handleChange={this.props.venueHandleChange}/>
                  <button type="submit">Create Venue</button>
                </form> : <button onClick={this.createVenue}>Add New Venue</button> }
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

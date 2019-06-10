import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VenueForm from './VenueForm';
import EventForm from './EventForm';
import decode from 'jwt-decode';
import { getUser } from '../services/apiHelper';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVenue: false,
      addEvent: false,
      user: null
    }
    this.createVenue = this.createVenue.bind(this);
    this.newVenue = this.newVenue.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  async componentDidMount() {
    try {
      const checkUser = await localStorage.getItem("jwt")
      if (checkUser) {
        const currentUser = decode(checkUser);
        const user = await getUser(checkUser, currentUser.venue_owner_id);
        await this.setState({
          user: user
        });
      }
    } catch (err) {
      console.log(err)
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

  createEvent = () => {
    this.setState({
      addEvent: true
    })
  }

  newEvent = (e) => {
    e.preventDefault();
    this.props.addEvent();
    this.setState({
      addEvent: false
    })
  }

  render() {
    const owner = this.state.user;
    return (
      <div className="account">
        { this.props.user_id && owner ?
          <div className="dashboard">
            <h2>Welcome, {owner.first_name} {owner.last_name}</h2>
            <p>Your Venues:</p>
            <div className="owner-venues">
              <ul>
                {owner.venues.map(venue => <li key={venue.id}><Link to={`/venues/${venue.id}`}>{venue.name}</Link> - {venue.category}
                  <p>{venue.address}</p>
                  </li>)}
              </ul>
            </div>
            <p>Your Events:</p>
            <div className="owner-events">
              <ul>
                {owner.venues.map(venue => venue.events.map(artEvent => <li key={artEvent.id}><Link to={`/events/${artEvent.id}`}>{artEvent.name}</Link> ({venue.name})</li>))}
              </ul>
            </div>
            <div>
              { this.state.addVenue ?
                <form onSubmit={this.newVenue}>
                  <VenueForm handleDaySelect={this.props.handleDaySelect} handleChange={this.props.venueHandleChange}/>
                  <button type="submit">Create Venue</button>
                </form> : <button onClick={this.createVenue}>Add New Venue</button> }
                { this.state.addEvent ?
                  <form onSubmit={this.newEvent}>
                    <EventForm user_id={this.props.user_id} handleChange={this.props.eventHandleChange} handleMediaSelect={this.props.handleMediaSelect} />
                    <button type="submit">Create Event</button>
                  </form> : <button onClick={this.createEvent}>Add New Event</button> }
            </div>
          </div>
          :
          <div>
            <p>Error: not logged in</p>
          </div> }
          {this.props.user_id && <button onClick={this.props.handleLogout}>Log Out</button>}
      </div>
    )
  }
}

export default AccountPage

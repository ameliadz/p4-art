import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getVenue } from '../services/apiHelper';
import decode from 'jwt-decode';
import VenueForm from './VenueForm';
import EventForm from './EventForm';

class SingleVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
      venue: null,
      editVenue: false,
      user_id: null
    }
    this.editArtVenue = this.editArtVenue.bind(this);
    this.updateArtVenue = this.updateArtVenue.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  async componentDidMount() {
    try {
      const venue = await getVenue(this.props.match.params.id);
      this.setState({ venue })
      if (localStorage.getItem("jwt")) {
        this.setState({
          user_id: decode(localStorage.getItem("jwt")).venue_owner_id
        })
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  editArtVenue() {
    this.props.selectVenue(this.state.venue);
    this.setState({
      editVenue: true
    })
  }

  async updateArtVenue(e, id) {
    e.preventDefault();
    try {
      this.props.updateVenue(id);
      const venue = await getVenue(this.props.match.params.id);
      await this.setState({
        editVenue: false,
        venue: venue
      })
    } catch (err) {
      console.log(err.message)
    }
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

  venueEvents = () => {
    const { venue } = this.state;
    if (venue.events.length > 0) {
      return venue.events.map(event => {
        return (
          <div className="venue-event" key={event.id}>
            <Link to={`/events/${event.id}`}><p className="venue-event-name">{event.name}</p></Link>
            <p>{event.price}</p>
            { event.permanent ? <p>Permanent event</p> : <p>{event.start_date} - {event.end_date}</p> }
          </div>
        )
      })
    } else {
      return <p className="venue-event center">Nothing currently scheduled at {venue.name}</p>
    }
  }

  render() {
    const { venue, user_id } = this.state;
    return (
      <div>
        { venue && <div className="single-venue">
          <div className="venue-info">
            <h2>{venue.name}</h2>
            <p>{venue.address}</p>
            <p>Hours: {venue.opening_time} - {venue.closing_time}</p>
            <p>Open: {venue.days.map((day, index) => <span key={index}>{day} </span>)}</p>
          </div>
          <h4>Events at {venue.name}:</h4>
            <div className="upcoming">
            {this.venueEvents()}
          </div>
          {user_id && (venue.venue_owner_id === user_id) ?
            <div className="buttons">
            {this.state.addEvent ?
              <form onSubmit={this.newEvent}>
              <EventForm user_id={this.props.user_id} handleChange={this.props.eventHandleChange} handleMediaSelect={this.props.handleMediaSelect} />
              <button type="submit">Create Event</button>
            </form> : <button type="button" onClick={() => this.createEvent()}>Add Event to Venue</button>}
              { this.state.editVenue ?
                <form onSubmit={(e) => this.updateArtVenue(e, venue.id)}>
                  <VenueForm user_id={this.props.user_id} selectVenue={this.props.selectVenue} venue={venue} handleChange={this.props.venueHandleChange} handleDaySelect={this.props.handleDaySelect} />
                  <button type="submit">Update Venue</button>
                </form> : <button type="button" onClick={this.editArtVenue}>Edit Venue</button> }
              <button type="button" onClick={() => this.props.handleDelete(venue.id)}>Delete Venue</button>
            </div> : <p></p> }
        </div> }
      </div>
    )
  }
 }

export default SingleVenue;

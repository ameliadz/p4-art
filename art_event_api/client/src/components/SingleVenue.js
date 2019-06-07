import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { getVenue } from '../services/apiHelper';

class SingleVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: null
    }
  }

  async componentDidMount() {
    const venue = await getVenue(this.props.match.params.id);
    this.setState({ venue })
  }

  venueEvents = () => {
    const { venue } = this.state;
    if (venue.events.length > 0) {
      return venue.events.map(event => {
        return (
          <div className="venue-event" key={event.id}>
            <Link to={`/events/${event.id}`}><p>{event.name}</p></Link>
            <p>{event.price}</p>
            { event.permanent ? <p>Permanent event</p> : <p>{event.start_date} - {event.end_date}</p> }
          </div>
        )
      })
    } else {
      return <p>Nothing currently scheduled at {venue.name}</p>
    }
  }

  render() {
    const { venue } = this.state;
    const checkUser = decode(localStorage.getItem("jwt"))
    return (
      <div>
        { venue && <div className="single-venue">
          <p>{venue.name}</p>
          <p>{venue.address}</p>
          <p>{venue.opening_time} - {venue.closing_time}</p>
          <p>Open: {venue.days.map((day, index) => <span key={index}>{day} </span>)}</p>
          <div className="upcoming">
            <h4>Events at {venue.name}:</h4>
            {this.venueEvents()}
          </div>
          { venue.venue_owner_id === checkUser.venue_owner_id ?
            <div className="buttons">
              <button type="button">Edit Venue</button>
              <button type="button">Delete Venue</button>
            </div> : null }
        </div> }
      </div>
    )
  }
 }

export default SingleVenue;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { getEvent } from '../services/apiHelper';

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artEvent: null
    }
  }

  async componentDidMount() {
    const artEvent = await getEvent(this.props.match.params.id);
    this.setState({ artEvent })
  }

  render() {
    const { artEvent } = this.state;
    const checkUser = decode(localStorage.getItem("jwt"))
    return (
      <div>
        { artEvent && <div className="single-event">
          <p>{artEvent.name}</p>
          <p>{artEvent.description}</p>
          <p>{artEvent.price}</p>
          { artEvent.permanent ? <p>Permanent event</p> : <p>{artEvent.start_date} - {artEvent.end_date}</p> }
          <ul>
            {artEvent.media.map((medium, index) => <li key={index}>{medium.category}</li>)}
          </ul>
          <img src={artEvent.images[2]} alt={artEvent.name} />
          <div className="event-venue">
            <p>At <Link to={`/venues/${artEvent.venue_id}`}>{artEvent.venue.name}</Link></p>
            <p>{artEvent.venue.address}</p>
            <p>{artEvent.venue.opening_time} - {artEvent.venue.closing_time}</p>
            <p>Open: {artEvent.venue.days.map((day, index) => <span key={index}>{day} </span>)}</p>
          </div>
          { artEvent.venue.venue_owner_id === checkUser.venue_owner_id ?
            <div className="buttons">
              <button type="button">Edit Event</button>
              <button onClick={() => this.props.handleDelete(artEvent.id)} type="button">Delete Event</button>
            </div> : null }
        </div> }
      </div>
    )
  }


}

export default SingleEvent;

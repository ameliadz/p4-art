import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    return (
      <div>
        { artEvent && <div className="single-event">
          <p>{artEvent.name}</p>
          <p>{artEvent.description}</p>
          <p>{artEvent.price}</p>
          { artEvent.permanent ? <p>Permanent event</p> : <p>{artEvent.start_date} - {artEvent.end_date}</p> }
          <img src={artEvent.images[2]} alt={artEvent.name} />
          <div className="event-venue">
            <p>At <Link to={`/venues/${artEvent.venue_id}`}>{artEvent.venue.name}</Link></p>
            <p>{artEvent.venue.address}</p>
            <p>{artEvent.venue.opening_time} - {artEvent.venue.closing_time}</p>
            <p>Open: {artEvent.venue.days.map((day, index) => <span key={index}>{day} </span>)}</p>
          </div>
        </div> }
      </div>
    )
  }


}

export default SingleEvent;

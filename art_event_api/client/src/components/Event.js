import React from 'react';
import { Link } from 'react-router-dom';

export default function Event(props) {
  const { event } = props;
  return (
    <div className="event">
      <p><Link to={`/events/${event.id}`}><span className="event-name">{event.name}</span></Link><br />
      At <Link to={`/venues/${event.venue_id}`}><span className="event-venue-name">{event.venue.name}</span></Link></p>
    </div>
  )
}

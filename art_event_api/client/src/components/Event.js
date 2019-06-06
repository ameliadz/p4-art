import React from 'react';
import { Link } from 'react-router-dom';

export default function Event(props) {
  const { event } = props;
  return (
    <div className="event">
      <p className="event-name"><Link to={`/events/${event.id}`}>{event.name}</Link> at {event.venue.name}</p>
    </div>
  )
}

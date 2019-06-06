import React from 'react';

export default function Event(props) {
  const { event, selectEvent } = props;
  return (
    <div className="event">
      <p className="event-name"><strong onClick={() => selectEvent(event)}>{event.name}</strong> at {event.venue.name}</p>
    </div>
  )
}

import React from 'react';

export default function SingleEvent(props) {
  const { event } = props;
  const days = event.venue.days;

  return (
    <div className="single-event">
      <p>{event.name}</p>
      <p>{event.description}</p>
      <p>Admission: {event.price}</p>
      { event.permanent ? <p>Permanent event</p> : <p>{event.start_date} - {event.end_date}</p> }
      <img src={event.images[2]} alt={event.name} />
      <div className="event-venue">
        <p>At {event.venue.name}</p>
        <p>{event.venue.address}</p>
        <p>{event.venue.opening_time} - {event.venue.closing_time}</p>
        <p>Open: {days.map((day, index) => <span key={index}>{day} </span>)}</p>
      </div>
    </div>
  )
}

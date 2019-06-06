import React from 'react';

export default function SingleVenue(props) {
  const { venue } = props;
  const days = venue.days;
  return (
    <div className="single-venue">
      <p>{venue.name}</p>
      <p>{venue.address}</p>
      <p>{venue.opening_time} - {venue.closing_time}</p>
      <p>Open: {days.map((day, index) => <span key={index}>{day} </span>)}</p>
    </div>
  )
}

import React from 'react';

export default function Venue(props) {
  const { venue, selectVenue } = props;
  return (
    <div className="venue">
      <p className="venue-name"><strong onClick={() => selectVenue(venue)}>{venue.name}</strong></p>
    </div>
  )
}

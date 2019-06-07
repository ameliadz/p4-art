import React, { Component } from 'react';

class VenueForm extends Component {
  render() {
    return(
      <div className="venue-form">
        <div>
          <label htmlFor="name" className="label">Venue Name</label>
          <div>
            <input name="name" type="text" placeholder="Venue name" onChange={props.handleChange}/>
          </div>
        </div>
      </div>
    )
  }
}

export default VenueForm

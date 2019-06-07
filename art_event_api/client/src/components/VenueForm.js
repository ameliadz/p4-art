import React, { Component } from 'react';

class VenueForm extends Component {
  render() {
    return(
      <div className="venue-form">
        <div>
          <label htmlFor="name" className="label">Venue Name</label>
          <div>
            <input name="name" type="text" placeholder="Venue name" onChange={this.props.handleChange} required/>
          </div>
        </div>
        <div>
          <label htmlFor="category" className="label">Venue Type</label>
          <div>
            <select name="category" onChange={this.props.handleChange} required>
              <option value="">-----</option>
              <option value="Museum">Museum</option>
              <option value="Gallery">Gallery</option>
              <option value="Cultural Center">Cultural Center</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="area" className="label">Neighborhood</label>
          <div>
            <input name="area" type="text" placeholder="Neighborhood" onChange={this.props.handleChange} required/>
          </div>
        </div>
        <div>
          <label htmlFor="address" className="label">Address</label>
          <div>
            <input name="address" type="text" placeholder="123 Address St., City, ST, ZIP##" onChange={this.props.handleChange} required/>
          </div>
        </div>
        <div>
          <label htmlFor="opening_time" className="label">Opening Time</label>
          <div>
            <input name="opening_time" type="time" step="1" onChange={this.props.handleChange} required/>
          </div>
        </div>
        <div>
          <label htmlFor="closing_time" className="label">Closing Time</label>
          <div>
            <input name="closing_time" type="time" step="1" onChange={this.props.handleChange} required/>
          </div>
        </div>
        <div>
          <label htmlFor="days_open" className="label">Days Open</label>
          <div>
            <input type="checkbox" name="days_open" value="mon" onChange={this.props.handleDaySelect} />Monday
            <input type="checkbox" name="days_open" value="tue" onChange={this.props.handleDaySelect} />Tuesday
            <input type="checkbox" name="days_open" value="wed" onChange={this.props.handleDaySelect} />Wednesday
            <input type="checkbox" name="days_open" value="thu" onChange={this.props.handleDaySelect} />Thursday
            <input type="checkbox" name="days_open" value="fri" onChange={this.props.handleDaySelect} />Friday
            <input type="checkbox" name="days_open" value="sat" onChange={this.props.handleDaySelect} />Saturday
            <input type="checkbox" name="days_open" value="sun" onChange={this.props.handleDaySelect} />Sunday
            <input type="checkbox" name="days_open" value="hol" onChange={this.props.handleDaySelect} />Holidays
          </div>
        </div>
      </div>
    )
  }
}

export default VenueForm

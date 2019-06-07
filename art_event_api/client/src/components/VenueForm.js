import React, { Component } from 'react';

class VenueForm extends Component {
  render() {
    const { venue } = this.props;
    return(
      <div className="venue-form">
        <div>
          <label htmlFor="name" className="label">Venue Name</label>
          <div>
            <input name="name" type="text" placeholder="Venue name" onChange={this.props.handleChange} defaultValue={(venue && venue.name) || ""} required/>
          </div>
        </div>
        <div>
          <label htmlFor="category" className="label">Venue Type</label>
          <div>
            <select name="category" defaultValue={(venue && venue.category) || ""} onChange={this.props.handleChange} required>
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
            <input name="area" type="text" placeholder="Neighborhood" onChange={this.props.handleChange} defaultValue={(venue && venue.area) || ""} required/>
          </div>
        </div>
        <div>
          <label htmlFor="address" className="label">Address</label>
          <div>
            <input name="address" type="text" placeholder="123 Address St., City, ST, ZIP##" defaultValue={(venue && venue.address) || ""} onChange={this.props.handleChange} required/>
          </div>
        </div>
        <div>
          <label htmlFor="opening_time" className="label">Opening Time</label>
          <div>
            <input name="opening_time" type="time" step="1" onChange={this.props.handleChange} defaultValue={(venue && venue.opening_time) || undefined} required/>
          </div>
        </div>
        <div>
          <label htmlFor="closing_time" className="label">Closing Time</label>
          <div>
            <input name="closing_time" type="time" step="1" onChange={this.props.handleChange} defaultValue={(venue && venue.closing_time) || undefined} required/>
          </div>
        </div>
        <div>
          <label htmlFor="days_open" className="label">Days Open</label>
          <div>
            <input type="checkbox" name="days_open" value="mon" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "mon")} />Monday
            <input type="checkbox" name="days_open" value="tue" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "tue")} />Tuesday
            <input type="checkbox" name="days_open" value="wed" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "wed")} />Wednesday
            <input type="checkbox" name="days_open" value="thu" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "thu")} />Thursday
            <input type="checkbox" name="days_open" value="fri" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "fri")} />Friday
            <input type="checkbox" name="days_open" value="sat" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "sat")} />Saturday
            <input type="checkbox" name="days_open" value="sun" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "sun")} />Sunday
            <input type="checkbox" name="days_open" value="hol" onChange={this.props.handleDaySelect} defaultChecked={venue && venue.days.some(day => day === "hol")} />Holidays
          </div>
        </div>
      </div>
    )
  }
}

export default VenueForm

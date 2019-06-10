import React, { Component } from 'react';
import { getMedia, getUser } from '../services/apiHelper';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: null,
      venues: null
    }
  }

  async componentDidMount() {
    const media = await getMedia();
    const checkUser = await localStorage.getItem("jwt")
    const user = await getUser(checkUser, this.props.user_id)
    const venues = user.venues;
    this.setState({ media, venues })
  }

  renderMedia() {
    const { media } = this.state;
    const inEventMedia = (medium) => {
      return this.props.artEvent && this.props.artEvent.media.some(media => media.id === medium.id)
    }
    return media.map(medium => {
      return <div key={medium.id}><input type="checkbox" name="media" value={medium.category} defaultChecked={media && inEventMedia(medium)} onChange={this.props.handleMediaSelect}/><span>{medium.category}</span></div>
    })
  }

  renderVenues() {
    const { venues } = this.state
    return (
      <select name="venue_id" onChange={this.props.handleChange} required>
        <option value="">------</option>
        { venues.map(venue => {
        return <option defaultValue={this.props.artEvent && this.props.artEvent.venue_id === venue.id} key={venue.id} value={venue.id}>{venue.name}</option>}) }
      </select>
    )
  }

  render() {
    const { artEvent } = this.props;
    return(
      <div className="event-form">
        <div>
          <label htmlFor="name" className="label">Event Name</label>
          <div>
            <input name="name" type="text" placeholder="Event name" onChange={this.props.handleChange} defaultValue={(artEvent && artEvent.name) || ""} required/>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="label">Description</label>
          <div>
            <textarea rows="5" name="description" placeholder="Event description" onChange={this.props.handleChange} defaultValue={(artEvent && artEvent.description) || ""} required></textarea>
          </div>
        </div>
        <div>
          <label htmlFor="price" className="label">Price/Admission</label>
          <div>
            <input name="price" type="text" placeholder="Price/Admission" onChange={this.props.handleChange} defaultValue={(artEvent && artEvent.price) || ""} required/>
          </div>
        </div>
        <div>
          <label htmlFor="start_date" className="label">Start Date</label>
          <div>
            <input name="start_date" type="date" onChange={this.props.handleChange} defaultValue={(artEvent && artEvent.start_date) || undefined}/>
          </div>
        </div>
        <div>
          <label htmlFor="end_date" className="label">End Date</label>
          <div>
            <input name="end_date" type="date" onChange={this.props.handleChange} defaultValue={(artEvent && artEvent.end_date) || undefined}/>
          </div>
        </div>
        <div>
          <label htmlFor="permanent" className="label">Permanent Event?</label>
          { /* if permanent event is false, start/end date should be required */ }
          <div className="radio">
            <div>
              <input name="permanent" type="radio" onChange={this.props.handleChange} value="true" checked={artEvent && artEvent.permanent}/>Yes
            </div>
            <div>
              <input name="permanent" type="radio" onChange={this.props.handleChange} value="false" />No
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="media" className="label">Hosting Venue</label>
          <div>
            {this.state.venues ? this.renderVenues() : <p>You don't have any venues to host this event!</p> }
          </div>
        </div>
        <div className="media">
          <label htmlFor="media" className="label">Media Types</label>
          <div>
            {this.state.media && this.renderMedia() }
          </div>
        </div>
      </div>
    )
  }
}

export default EventForm

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getEvent } from '../services/apiHelper';
import decode from 'jwt-decode';
import EventForm from './EventForm';
import Map from './Map';

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artEvent: null,
      editEvent: false,
      user_id: null
    }
    this.editArtEvent = this.editArtEvent.bind(this);
    this.updateArtEvent = this.updateArtEvent.bind(this);
  }

  async componentDidMount() {
    try {
      const artEvent = await getEvent(this.props.match.params.id);
      this.setState({ artEvent })
      console.log(localStorage.getItem("jwt"))
      if (localStorage.getItem("jwt")) {
        this.setState({
          user_id: decode(localStorage.getItem("jwt")).venue_owner_id
        })
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  editArtEvent() {
    this.props.selectEvent(this.state.artEvent);
    this.setState({
      editEvent: true
    })
  }

  async updateArtEvent(e, id) {
    e.preventDefault();
    try {
      this.props.updateEvent(id);
      const artEvent = await getEvent(this.props.match.params.id);
      await this.setState({
        editEvent: false,
        artEvent: artEvent
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  render() {
    const { artEvent, user_id } = this.state;
    return (
      <div>
        { artEvent && <div className="single-event">
          <p>{artEvent.name}</p>
          <p>{artEvent.description}</p>
          <p>{artEvent.price}</p>
          { artEvent.permanent ? <p>Permanent event</p> : <p>{artEvent.start_date} - {artEvent.end_date}</p> }
          <ul>
            {artEvent.media.map((medium, index) => <li key={index}>{medium.category}</li>)}
          </ul>
          <img src={artEvent.images[2]} alt={artEvent.name} />
          <Map art={artEvent}/>
          <div className="event-venue">
            <p>At <Link to={`/venues/${artEvent.venue_id}`}>{artEvent.venue.name}</Link></p>
            <p>{artEvent.venue.address}</p>
            <p>{artEvent.venue.opening_time} - {artEvent.venue.closing_time}</p>
            <p>Open: {artEvent.venue.days.map((day, index) => <span key={index}>{day} </span>)}</p>
          </div>
          {user_id && (artEvent.venue.venue_owner_id === user_id) ?
            <div className="buttons">
            { this.state.editEvent ?
              <form onSubmit={(e) => this.updateArtEvent(e, artEvent.id)}>
                <EventForm user_id={this.props.user_id} selectEvent={this.props.selectEvent} artEvent={artEvent} handleChange={this.props.eventHandleChange} handleMediaSelect={this.props.handleMediaSelect} />
                <button type="submit">Update Event</button>
              </form> : <button onClick={this.editArtEvent}>Edit Event</button> }
              <button onClick={() => this.props.handleDelete(artEvent.id)} type="button">Delete Event</button>
            </div> : <p></p> }
        </div> }
      </div>
    )
  }


}

export default SingleEvent;

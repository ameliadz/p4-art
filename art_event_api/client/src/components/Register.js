import React, { Component } from 'react';
import VenueForm from './VenueForm';

class Register extends Component {
  render() {
    return (
      <div className="register">
        <form onSubmit={this.props.handleRegisterButton}>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div>
              <input name="email" type="text" placeholder="email" onChange={this.props.handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <div>
              <input name="password" type="password" placeholder="password" onChange={this.props.handleChange}/>
            </div>
          </div>

          <div>
            <label htmlFor="first_name" className="label">First Name</label>
            <div>
              <input name="first_name" type="text" placeholder="first name" onChange={this.props.handleChange}/>
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="label">Last Name</label>
            <div>
              <input name="last_name" type="text" placeholder="last name" onChange={this.props.handleChange}/>
            </div>
          </div>

          <div>
            <VenueForm handleChange={this.props.venueHandleChange} handleDaySelect={this.props.handleDaySelect} />
          </div>

          <div>
            <p>
              <button type="submit">Register</button>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default Register

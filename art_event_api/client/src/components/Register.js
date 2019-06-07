import React from 'react';
import VenueForm from './VenueForm';

export default function Register(props) {
  return (
    <div className="register">
      <form onSubmit={props.handleRegisterButton}>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <div>
            <input name="email" type="text" placeholder="email" onChange={props.handleChange} />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="label">Password</label>
          <div>
            <input name="password" type="password" placeholder="password" onChange={props.handleChange}/>
          </div>
        </div>

        <div>
          <label htmlFor="first_name" className="label">Password</label>
          <div>
            <input name="first_name" type="text" placeholder="first name" onChange={props.handleChange}/>
          </div>
        </div>

        <div>
          <VenueForm handleChange={props.handleChange} />
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

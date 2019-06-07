import React from 'react';
import { Link } from 'react-router-dom';

export default function Login(props) {
  return (
    <div className="login">
      <form onSubmit={props.handleLoginButton}>
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
          <p>
            <button type="submit">Login</button>
          </p>
        </div>
      </form>
      <p>Don't have an account? <Link to='/register'>Sign up!</Link></p>
    </div>
  )
}

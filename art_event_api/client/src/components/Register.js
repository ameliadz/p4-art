import React from 'react';

export default function Register(props) {
  return (
    <div className="register">
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
    </div>
  )
}

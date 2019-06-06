import React, { Component } from 'react';

class AccountPage extends Component {
  render() {
    const owner = this.props.user;
    return (
      <div>
        { owner ?
          <div>
            <h2>Welcome, {owner.first_name} {owner.last_name}</h2>
            <button onClick={this.props.handleLogout}>Log Out</button>
          </div>
          :
          <div>
            <p>Error: not logged in</p>
          </div> }
      </div>
    )
  }
}

export default AccountPage

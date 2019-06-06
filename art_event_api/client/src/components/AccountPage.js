import React, { Component } from 'react';

class AccountPage extends Component {
  render() {
    const owner = this.props.user;
    return (
      <div>
        { owner ? <h2>Welcome, {owner.first_name} {owner.last_name}</h2> : <p>Error: not logged in</p> }
      </div>
    )
  }
}

export default AccountPage

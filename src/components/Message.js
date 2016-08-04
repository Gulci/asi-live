import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <h3 id="message">{this.props.message}</h3>
    );
  }
}

export default Message;

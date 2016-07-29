'use strict'

import React from 'react';

module.exports = React.createClass({
  render: function() {
    return (
      <h3 id="message">{this.props.message}</h3>
    );
  }
});

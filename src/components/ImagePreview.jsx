'use strict'

import React from 'react';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      invalidImage: null
    }
  },

  componentWillReceiveProps() {
    this.setState({
      invalidImage: false
    });
  },

  onInvalidImage: function() {
    this.setState({
      invalidImage: true
    });
  },

  render: function() {
    var image;

    if (this.props.imageURL && !this.state.invalidImage) {
      image = (
        <img 
          id="post-image-preview"
          onError={this.onInvalidImage}
          src={this.props.imageURL} 
        />
      )
    } else if (this.props.imageURL && this.state.invalidImage) {
      image = (
        <span>Image URL is invalid.</span>
      )
    } else {
      image = (
        <span>No URL specified.</span>
      )
    }
    return (
      <div>{image}</div>
    );
  }
});

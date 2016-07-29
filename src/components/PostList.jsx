'use strict'

import React from 'react';

import Post from './Post';

module.exports = React.createClass({
  render: function() {
    var rows = [];
    this.props.posts.forEach(function (post) {
      rows.push(<Post key={post.postKey} child={this.props.child} postKey={post.postKey} imageURL={post.imageURL} />);
    }.bind(this));

    return (
      <ul className="list-group" id="post-list">{rows}</ul>
    );
  }
});

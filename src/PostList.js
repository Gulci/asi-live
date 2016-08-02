import React, { Component } from 'react';

import Post from './Post';

class PostList extends Component {
  render() {
    var rows = [];
    this.props.posts.forEach( (post) => {
      rows.push(<Post key={post.postKey} child={this.props.child} postKey={post.postKey} imageURL={post.imageURL} />);
    });

    return (
      <ul className="list-group" id="post-list">{rows}</ul>
    );
  }
}

export default PostList;

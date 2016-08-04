import React, { Component } from 'react';

import Firebase from 'firebase';

import PostList from './PostList';
import Uploader from './Uploader';

class PostManager extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    var postsRef = Firebase.database().ref(this.props.child);

    postsRef.on('child_added', (snapshot) => {
      var data = snapshot.val();
      data['postKey'] = snapshot.key;

      var freshArray = this.state.posts;
      freshArray.push(data);

      this.setState({
        posts: freshArray
      });
    }, (errorObject) => {
      alert('For some reason, reading failed: ' + errorObject.code);
    });

    postsRef.on('child_removed', (snapshot) => {
      var freshArray = this.state.posts;
      for(var i = 0; i < freshArray.length; i++) {
        if(freshArray[i].postKey === snapshot.key) {
          freshArray.splice(i, 1);
          break;
        }
      }

      this.setState({
        posts: freshArray
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="add-post row">
          <Uploader child={this.props.child} />
        </div>

        <PostList posts={this.state.posts} child={this.props.child} />
      </div>
    );
  }
}

export default PostManager;

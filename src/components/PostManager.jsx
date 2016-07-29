'use strict'

import React from 'react';

import PostList from './PostList';
import ImagePreview from './ImagePreview';
import Uploader from './Uploader';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    }
  },

  componentDidMount: function() {
    var postsRef = firebase.database().ref(this.props.child);

    postsRef.on('child_added', function (snapshot) { 
      var data = snapshot.val();
      data['postKey'] = snapshot.key;

      var freshArray = this.state.posts;
      freshArray.push(data);

      this.setState({
        posts: freshArray
      });
    }.bind(this), function(errorObject) {
      alert('For some reason, reading failed: ' + errorObject.code);
    });

    postsRef.on('child_removed', function(snapshot) {
      var freshArray = this.state.posts;
      for(var i = 0; i < freshArray.length; i++) {
        if(freshArray[i].postKey == snapshot.key) {
          freshArray.splice(i, 1);
          break;
        }
      }

      this.setState({
        posts: freshArray
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className="container">
        <div className="add-post row">
          <Uploader child={this.props.child} />
        </div>

        <PostList posts={this.state.posts} child={this.props.child} />
      </div>
    );
  }
});

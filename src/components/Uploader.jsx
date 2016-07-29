'use strict'

import React from 'react';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

module.exports = React.createClass({
  getInitialState: function() {
    return ({
      file: null
    })
  },

  componentDidMount: function() {
    document.getElementById('uploader-file-input').addEventListener('change', this.handleFileChange, false);
  },

  handleFileUpload: function() {
    var storageRef = firebase.storage().ref();
    var postsRef = firebase.database().ref(this.props.child);

    if(this.state.file === null) {
      Alert.error('Please select an image to upload.', {
        position: 'top-right',
        effect: 'stackslide',
        offset: 50
      });
    } else {
      var file = this.state.file.data;
      var metadata = this.state.file.metadata;
      var uploadTask = storageRef.child(this.props.child + '/' + file.name).put(file, metadata);

      uploadTask.on('state_changed', function(snapshot) {

      }, function(error) {
        Alert.error('There was an arror uploading: ' + error, {
          position: 'top-right',
          effect: 'stackslide',
          offset: 50
        });
      }, function() {
        var post = {
          imageURL: uploadTask.snapshot.downloadURL
        };

        var item = postsRef.push();
        item.setWithPriority(post, 0 - Date.now());

        Alert.success('Image posted!', {
          position: 'top-right',
          effect: 'stackslide',
          offset: 50
        });
      })
    }
  },

  handleFileChange: function(e) {
    e.stopPropagation();
    e.preventDefault();
    var newFile = {
      data: e.target.files[0],
      metadata: {
        'contentType': e.target.files[0].type
      }
    }

    this.setState({
      file: newFile
    });
  },

  render: function() {
    return (
      <div className="uploader">
        <h2>Add a new post:</h2>
        <input type="file" id="uploader-file-input" name="post" />
        <button type="button" onClick={this.handleFileUpload} className="btn btn-default">Post</button>
      </div>
    );
  }
});

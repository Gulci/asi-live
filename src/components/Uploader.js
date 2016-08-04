import React, { Component } from 'react';

import Alert from 'react-s-alert';
import Firebase from 'firebase';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

class Uploader extends Component {
  state = {
    file: null
  }

  componentDidMount() {
    document.getElementById('uploader-file-input').addEventListener('change', this.handleFileChange, false);
  }

  handleFileUpload = () => {
    var storageRef = Firebase.storage().ref();
    var postsRef = Firebase.database().ref(this.props.child);

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

      uploadTask.on('state_changed', (snapshot) => {

      }, (error) => {
        Alert.error('There was an arror uploading: ' + error, {
          position: 'top-right',
          effect: 'stackslide',
          offset: 50
        });
      }, () => {
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
  }

  handleFileChange = (e) => {
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
  }

  render() {
    return (
      <div className="uploader">
        <h2>Add a new post:</h2>
        <input type="file" id="uploader-file-input" name="post" />
        <button type="button" onClick={this.handleFileUpload} className="btn btn-default">Post</button>
      </div>
    );
  }
}

export default Uploader;

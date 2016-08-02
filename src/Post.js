import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { Modal, Button } from 'react-bootstrap';
import Firebase from 'firebase';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

class Post extends Component {
  state = {
    showDeleteModal: false
  }

  showDeleteModal = () => {
    this.setState({
      showDeleteModal: true
    });
  }

  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    });
  }

  handleDelete = () => {
    var postsRef = Firebase.database().ref(this.props.child);
    postsRef.child(this.props.postKey).remove();

    Alert.success('Post deleted!', {
      position: 'top-right',
      effect: 'stackslide',
      offset: 50
    });
  }

  render() {
    return (
      <div>
        <li className="post-li list-group-item">
          <div className="post-edit btn-group">
            <button 
              type="button" 
              className="post-delete-button btn btn-default"
              onClick={this.showDeleteModal}>
              <i className="fa fa-remove fa-2x"></i>
            </button>
          </div>
          <div className="post-list-container">
            <span className="post-image-info">
              <div className="post-image">
                <img alt="post-preview" src={this.props.imageURL} />
              </div>
            </span>
          </div>
        </li>
        <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal} >
          <Modal.Header closeButton>
            <Modal.Title>Delete post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>Click delete to confirm.</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeDeleteModal}>Close</Button>
            <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Post;

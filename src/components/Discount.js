import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { Modal, Button } from 'react-bootstrap';
import Firebase from 'firebase';

import 'font-awesome/css/font-awesome.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

class Discount extends Component {
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
    var discountsRef = Firebase.database().ref(this.props.child);
    discountsRef.child(this.props.discountKey).remove();

    Alert.success('Discount deleted!', {
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
            <span className="discount-info">
              <img 
                className="img-responsive" 
                alt="post-preview" 
                src={this.props.imageURL} 
              />
            </span>
            <p>Business Name: {this.props.name}</p>
            <p>Business Address: {this.props.location}</p>
            <p>Discount: {this.props.description}</p>
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

export default Discount;

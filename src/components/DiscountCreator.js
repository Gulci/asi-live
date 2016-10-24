import React, { Component } from 'react';

import Alert from 'react-s-alert';
import Firebase from 'firebase';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

class DiscountCreator extends Component {
  state = {
    name: "",
    address: "",
    discount: "",
    file: null
  }

  componentDidMount() {
    document.getElementById('uploader-file-input').addEventListener('change', this.handleFileChange, false);
  }

  isInputEmpty = (input) => {
    if (input === null ) {
      return true
    } else if (input === "") {
      return true
    } else {
      return false
    }
  }

  handleSubmit = () => {
    var storageRef = Firebase.storage().ref();
    var postsRef = Firebase.database().ref(this.props.child);

    let isNameEmpty = this.isInputEmpty(this.state.name);
    let isAddressEmpty = this.isInputEmpty(this.state.address);
    let isFileDiscountEmpty = this.isInputEmpty(this.state.discount);

    if(this.state.file === null) {
      Alert.error('Please select an image to upload.', {
        position: 'top-right',
        effect: 'stackslide',
        offset: 50
      });
    } 

    else if(isNameEmpty || isAddressEmpty || isFileDiscountEmpty) {
      Alert.error('Please fill out all the fields.', {
        position: 'top-right',
        effect: 'stackslide',
        offset: 50
      });
    } 
    
    else {
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
        var discount = {
          businessName: this.state.name,
          businessLocation: this.state.address,
          businessDiscount: this.state.discount,
          businessImageURL: uploadTask.snapshot.downloadURL
        };

        var item = postsRef.push();
        item.set(discount);

        this.setState({
          name: "",
          address: "",
          discount: "",
          file: null
        }, () => {
          document.getElementById('discount-creator-' + this.props.child).reset();
        })

        Alert.success('Image posted!', {
          position: 'top-right',
          effect: 'stackslide',
          offset: 50
        });
      })
    }
  }

  handleFieldChange = (field, e) => {
    switch(field) {
      case 'name':
        this.setState({name: e.target.value})
        break;
      case 'address':
        this.setState({address: e.target.value})
        break;
      case 'discount':
        this.setState({discount: e.target.value})
        break;
      default:
        break;
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
      <form className="uploader" id={"discount-creator-" + this.props.child}>
        <h2>Add a new business:</h2>
        <input 
          type="text" 
          className="form-control"
          placeholder="Name"
          onChange={this.handleFieldChange.bind(this, 'name')}
          value={this.state.name}
        /><br />
        <input 
          type="text" 
          className="form-control"
          placeholder="Address"
          onChange={this.handleFieldChange.bind(this, 'address')}
          value={this.state.address}
        /><br />
        <input 
          type="text" 
          className="form-control"
          placeholder="Discount"
          onChange={this.handleFieldChange.bind(this, 'discount')}
          value={this.state.discount}
        /><br />
        <label htmlFor="uploader-file-input">Logo</label>
        <input type="file" id="uploader-file-input" />
        <button type="button" onClick={this.handleSubmit} className="btn btn-default">Post</button>
      </form>
    );
  }
}

export default DiscountCreator;

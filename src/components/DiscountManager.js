import React, { Component } from 'react';

import Firebase from 'firebase';

import DiscountCreator from './DiscountCreator';
import DiscountList from './DiscountList';

class DiscountManager extends Component {
  state = {
    discounts: []
  }

  componentDidMount() {
    var discountsRef = Firebase.database().ref(this.props.child);

    discountsRef.on('child_added', (snapshot) => {
      var data = snapshot.val();
      data['discountKey'] = snapshot.key;

      var freshArray = this.state.discounts;
      freshArray.push(data);

      this.setState({
        discounts: freshArray
      });
    }, (errorObject) => {
      alert('For some reason, reading failed: ' + errorObject.code);
    });

    discountsRef.on('child_removed', (snapshot) => {
      var freshArray = this.state.discounts;
      for(var i = 0; i < freshArray.length; i++) {
        if(freshArray[i].discountKey === snapshot.key) {
          freshArray.splice(i, 1);
          break;
        }
      }

      this.setState({
        discounts: freshArray
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="add-post row">
          <DiscountCreator child={this.props.child} />
        </div>

        <DiscountList discounts={this.state.discounts} child={this.props.child} />
      </div>
    );
  }
}

export default DiscountManager;


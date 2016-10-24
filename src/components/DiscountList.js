import React, { Component } from 'react';

import Discount from './Discount';

class DiscountList extends Component {
  render() {
    var rows = [];
    this.props.discounts.forEach( (discount) => {
      rows.push(
        <Discount 
          key={discount.discountKey} 
          child={this.props.child} 
          discountKey={discount.discountKey}
          description={discount.businessDiscount}
          location={discount.businessLocation}
          name={discount.businessName}
          imageURL={discount.businessImageURL} />
      );
    });

    return (
      <ul className="list-group" id="post-list">{rows}</ul>
    );
  }
}

export default DiscountList;

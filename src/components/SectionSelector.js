import React, { Component } from 'react';

import Message from './Message';

class SectionSelector extends Component {
  render() {
    var selection;

    if (this.props.auth) {
      selection = (
        <div className="row">
          <div className="app-section col-md-4">
            <h2>Merchandise</h2>
            <p>Add and update merchandise photos. </p>
            <p>
              <a 
                className="btn btn-default" 
                href="#/merch" 
                role="button">
                  Merchandise &raquo;
              </a>
            </p>
          </div>
          <div className="app-section col-md-4">
            <h2>What's Up</h2>
            <p>Create a new What's Up post.</p>
            <p>
              <a 
                className="btn btn-default" 
                href="#/posts" 
                role="button">
                  Posts &raquo;
              </a>
            </p>
          </div>
          <div className="app-section col-md-4">
            <h2>Discounter</h2>
            <p>Add a new Discounter business.</p>
            <p>
              <a 
                className="btn btn-default" 
                href="#/discounter" 
                role="button">
                  Discounter &raquo;
              </a>
            </p>
          </div>
        </div>
      )
    } else {
      selection = (
        <Message message="To make changes, you must be logged in." />
      )
    }

    return(
      <div id="section-selector" className="container">
        {selection}
      </div>
    );
  }
}

export default SectionSelector;

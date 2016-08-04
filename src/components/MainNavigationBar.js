import React, { Component } from 'react';

import NavAuth from './NavAuth';
import './login.css'

class MainNavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#/home">ASI/USU Live</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <NavAuth auth={this.props.auth} />
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNavigationBar;

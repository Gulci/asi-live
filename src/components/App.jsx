'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';

import NavAuth from './NavAuth';
import SectionSelector from './SectionSelector';
import PostManager from './PostManager';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      currentRoute: window.location.hash,
    }
  },

  componentWillMount() {
    window.addEventListener('hashchange', this.navigate, false);
  },

  componentDidMount() {
    // Firebase user state
    firebase.auth().onAuthStateChanged(function(userData) {
      if (userData) {
        this.setState({
          user: userData
        }, function() {
          // Navigate to initial route
          this.navigate();
        });
      } else {
        this.setState({
          user: null
        }, function() {
          // Navigate to initial route
          this.navigate();
        });
      }
    }.bind(this));
  },

  // Micro router for our app
  navigate: function() {
    var componentToLoad;

    this.setState({
      currentRoute: window.location.hash
    }, function() {
      // load appropriate route
      switch (this.state.currentRoute) {
        case '#/home':
          componentToLoad = <SectionSelector auth={this.state.user} />
          break;
        case '#/posts':
          if (this.state.user) {
            componentToLoad = <PostManager child="posts" auth={this.state.user} />
          }
          break;
        case '#/merch':
          if (this.state.user) {
            componentToLoad = <PostManager child="merch" auth={this.state.user} />
          }
          break;
        default:
          componentToLoad = <SectionSelector auth={this.state.user} />
      }

      ReactDOM.render(componentToLoad, document.getElementById('loaded-component'));
    });
  },

  render: function() {
    return (
      <div id="app">
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
              <NavAuth auth={this.state.user} />
            </div>
          </div>
        </nav>

        <div id="loaded-component">
          <SectionSelector auth={this.state.user} />
        </div>

        <Alert />
      </div>
    );
  }
});

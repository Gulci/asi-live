import React, { Component } from 'react';

import Alert from 'react-s-alert';
import Firebase from 'firebase';

import MainNavigationBar from './components/MainNavigationBar';
import SectionSelector from './components/SectionSelector';
import PostManager from './components/PostManager';
import './App.css';

class App extends Component {
  state = {
    user: null,
    currentRoute: window.location.hash,
    loadedComponent: null
  }

  constructor(props) {
    super(props);

    window.addEventListener('hashchange', this.navigate, false);
  }

  componentDidMount() {
    Firebase.auth().onAuthStateChanged((userData) => {
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
    });
  }

  navigate = () => {
    var currentRoute = window.location.hash;
    var componentToLoad;

    switch (currentRoute) {
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
        break;
    }

    this.setState({
      loadedComponent: componentToLoad
    });
  }

  render() {
    let { loadedComponent } = this.state;
    return (
      <div className="App">
        <div className="main-content">
          <MainNavigationBar auth={this.state.user} />
          {(loadedComponent)}
        </div>
        <Alert />
      </div>
    );
  }
}

export default App;

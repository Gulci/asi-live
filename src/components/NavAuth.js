import React, { Component } from 'react';

import Firebase from 'firebase';

class NavAuth extends Component {
  handleSignOut() {
    Firebase.auth().signOut();
  }

  handleSignIn() {
    var email = document.getElementById('auth-email').value;
    var password = document.getElementById('auth-password').value;

    Firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password!');
      } else {
        alert(errorMessage);
      }
    })
  }

  render() {
    var auth;

    if (this.props.auth) {
      auth = (
        <div>
          <li>
            <p className="navbar-btn">
              <span id="user-email">{this.props.auth.email}</span>
              <button id="auth-signout" onClick={this.handleSignOut} type="button" className="btn btn-default">Sign Out</button>
            </p>
          </li>
        </div>
      )
    } else {
      auth = (
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
          <ul id="login-dp" className="dropdown-menu">
            <li>
              <div className="row">
                <div className="col-md-12">
                 <form className="form" id="login-nav">
                    <div className="form-group">
                       <label className="sr-only" htmlFor="auth-email">Email address</label>
                       <input type="email" className="form-control" id="auth-email" placeholder="Email address" required />
                    </div>
                    <div className="form-group">
                       <label className="sr-only" htmlFor="auth-password">Password</label>
                       <input type="password" className="form-control" id="auth-password" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                       <button type="button" onClick={this.handleSignIn} className="btn btn-primary btn-block">Sign in</button>
                    </div>
                 </form>
                </div>
              </div>
            </li>
          </ul>
        </li>
      )
    }

    return(
      <ul className="nav navbar-nav navbar-right">
        {auth}
      </ul>
    );
  }
}

export default NavAuth;

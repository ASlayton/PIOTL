import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from  '../../firebaseRequests/auth';
import './Header.css';

class Navbar extends React.Component {
  render () {
    const {authed, wentAway} = this.props;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      wentAway();
    };

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <h1 className="app-name">Put It On The List</h1>
          </div>
          <div>
            <p>Username</p>
            <p>Account Type</p>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            {
              authed ? (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <button
                      onClick={logoutClickEvent}
                      className="btn btn-warning"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right">
                  <button className="btn btn-warning">
                    <Link to="/login" className="login-btn">Login!</Link>
                  </button>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

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
      <div className="">
        <div className="">
          <div className="">
            <h1 className="">Put It On The List</h1>
          </div>
          <div className="" id="">
            {
              authed ? (
                <ul className="">
                  <li>
                    <div
                      onClick={logoutClickEvent}
                      className=""
                    >
                      <Link to="/LandingPage">Logout</Link>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="" hidden>
                  <button className="">
                    <Link to="/login" className="">Login!</Link>
                  </button>
                </ul>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;

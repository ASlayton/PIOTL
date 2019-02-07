import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  render () {

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <Link to="/ChoresPage">Chores</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  render () {

    return (
      <div className="">
        <Link to="/ChoresPage">Chores</Link>
        <Link to="/Home">Home</Link>
      </div>
    );
  }
}

export default Navbar;

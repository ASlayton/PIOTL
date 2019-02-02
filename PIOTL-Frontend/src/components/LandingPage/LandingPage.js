import './LandingPage.css';
import React from 'react';
import {Link}  from 'react-router-dom';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class LandingPage extends React.Component {
  render () {
    return (
      <div>
        <div>
          <h1>Struggling to keep up with allowances? </h1>
          <p>Put it on the list is an app for the entire family to keep up to date with chores, allowances, and offers a calendar for the entire family.</p>
        </div>
        <div>
          <button><Link to="/Login" className="btn">Login</Link></button>
          <button><Link to="/register" className="btn">Register</Link></button>
        </div>
      </div>
    );
  }
};

export default LandingPage;

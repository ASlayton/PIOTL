import './Home.css';
import React from 'react';
import Memo from '../Memo/Memo';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Home extends React.Component {
  state = {
    user: {},
  };

  render () {
    return (
      <div>
        <div>
          <Memo />
        </div>
      </div>
    );
  }
};

export default Home;

import './Home.css';
import React from 'react';
import Memo from '../Memo/Memo';
import api from '../../api-access/api';
import auth from '../../firebaseRequests/auth';

// IF SIGNED IN, USER IS DIRECTED HERE
class Home extends React.Component {
  state = {
    user: {},
  };
  componentDidMount () {
    const id = auth.getUid();
    api.apiGet('User/' + id)
      .then(res => {
        const data = res.data;
        this.setState({user: data});
      })
      .catch((err) => {
        console.error('Error with user get request', err);
      });
  };

  render () {
    return (
      <div>
        <div>
          <Memo user={this.state.user}/>
        </div>
      </div>
    );
  }
};

export default Home;

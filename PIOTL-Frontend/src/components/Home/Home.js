import './Home.css';
import React from 'react';
import Memo from '../Memo/Memo';
import ToDo from '../ToDo/ToDo';
import ToDoWeek from '../ToDoWeek/ToDoWeek';
import PastDue from '../PastDue/PastDue';
import api from '../../api-access/api';
import auth from '../../firebaseRequests/auth';

// IF SIGNED IN, USER IS DIRECTED HERE
class Home extends React.Component {

  state = {
    user: {},
    chores: [],
  };
  userHandler = (user) => {
    this.setState({user});
  }
  choreHandler = (chores) => {
    this.setState({chores});
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
    api.apiGet('Chore/')
      .then(res => {
        const data = res.data;
        this.setState({chores: data});
      });
  };

  render () {
    return (
      <div>
        <div>
          <Memo
            user={this.state.user}
            userHandler={this.userHandler}
          />
          <PastDue
            user={this.state.user}
            chores={this.state.chores}
            choreHandler={this.choreHandler}
          />
          <ToDo
            user={this.state.user}
            chores={this.state.chores}
            choreHandler={this.choreHandler}
          />
          <ToDoWeek
            user={this.state.user}
            chores={this.state.chores}
            choreHandler={this.choreHandler}
          />
        </div>
      </div>
    );
  }
};

export default Home;

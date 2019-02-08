import './ChoresPage.css';
import React from 'react';
import api from '../../api-access/api';
import auth from '../../firebaseRequests/auth';
import ChoresCard from '../ChoresCard/ChoresCard';
import ChoresForm from '../ChoresForm/ChoresForm';

class ChoresPage extends React.Component {

  state = {
    user: {},
    family: [],
    chores: [],
    choresList: []
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

    api.apiGet('ChoresList/')
      .then(res => {
        const data = res.data;
        this.setState({choresList: data});
      });
  };

  componentDidUpdate () {
    if (!this.state.user || this.state.family.length) return;
    api.apiGet('User/familyMembers/' + this.state.user.familyId)
      .then(res => {
        const data = res.data;
        this.setState({family: data});
      });

  }
  render () {
    const tasks = {};
    const familyContainer = this.state.family.map((member) => {
      tasks[member.firstName] = [];
      this.state.choresList.forEach((item) => {
        if (item.assignedTo === member.id) {
          tasks[member.firstName].push(item);
        }
      });
      return (
        <div className={member.firstName}>
          <span className="name-header">{member.firstName}</span>
          <ChoresCard tasks={member.tasks} />
        </div>
      );
    });

    const choresList = this.state.chores.map((chore) => {
      return (
        <li>{chore.name}</li>
      );
    });

    return (
      <div className="container-drag">
        <h2>Drag and Drop Chores</h2>

        <div>{familyContainer}</div>
        <div className="droppable" onDragOver={(e) => this.onDragOver(e)}>
          <h3>Chores List</h3>
          <ul>
            {choresList}
          </ul>
        </div>
        <ChoresForm chores={this.state.chores} family={this.state.family}/>

      </div>
    );
  }
};

export default ChoresPage;

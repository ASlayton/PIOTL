import './ChoresPage.css';
import React from 'react';
import api from '../../api-access/api';
import auth from '../../firebaseRequests/auth';
import ChoresForm from '../ChoresForm/ChoresForm';

class ChoresPage extends React.Component {

  state = {
    user: {},
    family: [],
    chores: [],
    choresList: [],
    chosenMember: ''
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

  onChange = date => this.setState({date});
  famChange = (e) => this.setState({chosenMember: e.target.value});

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
        <option value={member.firstName}>
          {member.firstName}
        </option>
      );
    });

    const entireFamily = Object.keys(tasks).map((person) => {
      const taskarray = tasks[person].map((tsk) => {
        console.log('Task: ', tsk.id);
        return (
          <li>{tsk.type}</li>
        );
      });
      return (
        <div className="family-member-task-container">
          <h3>{person}</h3>
          <ul>
            {taskarray}
          </ul>
        </div>

      );
    });
    console.log('Tasks: ', tasks);
    return (
      <div className="container">
        <h2>Family Assignments</h2>
        <div className="have-tasks-container">
          {entireFamily}
        </div>

        <select name="familyMembers" id="familyDropDown" onChange={(e) => this.famChange(e)}>
          {familyContainer}
        </select>
        <ChoresForm chores={this.state.chores} family={this.state.family}/>

      </div>
    );
  }
};

export default ChoresPage;

import './ChoresPage.css';
import React from 'react';
import api from '../../api-access/api';
import auth from '../../firebaseRequests/auth';
import ChoresForm from '../ChoresForm/ChoresForm';
import moment from 'moment';
class ChoresPage extends React.Component {
  constructor (props) {
    super(props);
    this.updateChore = this.updateChore.bind(this);
    this.state = {
      user: {},
      family: [],
      chores: [],
      choresList: [],
      updatedChore: {}
    };
  }

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

  choresListUpdate = () => {
    api.apiGet('ChoresList/')
      .then(res => {
        const data = res.data;
        this.setState({choresList: data});
      });
  };
  onChange = date => this.setState({date});
  famChange = (e) => this.setState({chosenMember: e.target.value});

  updateChore = (id, e) => {
    const myValue = e.target.checked;
    const newChore = {...this.state.choresList};
    let updatedChore = {};
    for (let i = 0; i < Object.keys(newChore).length; i++) {
      if (newChore[i].id === id) {
        const newType = this.getTypeId(newChore[i].type);
        updatedChore = {
          'id': newChore[i].id,
          'dateAssigned': moment().format('YYYY-MM-DD h:mm A'),
          'dateDue': newChore[i].dateDue,
          'completed': myValue,
          'type': newType,
          'assignedTo': newChore[i].assignedTo,
          'assignedBy': newChore[i].assignedBy,
          'familyId': this.state.user.familyId
        };
      };
    };
    this.pushThisShit(updatedChore);
    this.setState({updatedChore: updatedChore});
  };

  pushThisShit = (myObject) => {
    api.apiPut('ChoresList', myObject)
      .then(res => {
        console.log('Success in updating choreslist');
      })
      .catch((err) => {
        console.error('Success in updating choreslist', err);
      });
  };

  getTypeId = (typeName) => {
    let myValue = 0;
    this.state.chores.forEach((chore) => {
      if (chore.name === typeName) {
        myValue = chore.id;
      }
    });
    return myValue;
  };

  render () {
    const tasks = {};
    this.state.family.map((member) => {
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
      const monday = [];
      const tuesday = [];
      const wednesday = [];
      const thursday = [];
      const friday = [];
      const saturday = [];
      const sunday = [];
      const startDate = moment().startOf('week');
      const endDate = moment().endOf('week');
      tasks[person].forEach((tsk) => {
        if (moment(tsk.dateDue).day() === 0 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          sunday.push(tsk);
        } else if (moment(tsk.dateDue).day() === 1 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          monday.push(tsk);
        } else if (moment(tsk.dateDue).day() === 2 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          tuesday.push(tsk);
        } else if (moment(tsk.dateDue).day() === 3 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          wednesday.push(tsk);
        } else if (moment(tsk.dateDue).day() === 4 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          thursday.push(tsk);
        } else if (moment(tsk.dateDue).day() === 5 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          friday.push(tsk);
        } else if (moment(tsk.dateDue).day() === 6 && moment(tsk.dateDue).isBetween(startDate, endDate)) {
          saturday.push(tsk);
        };
      });
      return (
        <div className="family-member-task-container">
          <h3>{person}</h3>

          <div>
            <h4>Sunday</h4>
            <ul>
              {
                sunday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <h4>Monday</h4>
            <ul>
              {
                monday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <h4>Tuesday</h4>
            <ul>
              {
                tuesday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <h4>Wednesday</h4>
            <ul>
              {
                wednesday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <h4>Thursday</h4>
            <ul>
              {
                thursday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <h4>Friday</h4>
            <ul>
              {
                friday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div>
            <h4>Saturday</h4>
            <ul>
              {
                saturday.map((item) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.type} onChange={(e) => this.updateChore(item.id, e)} defaultChecked={item.completed}/>
                      <label htmlFor="">{item.type}</label>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <h2>Family Assignments</h2>
        <div className="have-tasks-container">
          {entireFamily}
        </div>
        <ChoresForm chores={this.state.chores} family={this.state.family} user={this.state.user} choresList={this.state.choresList} choresListUpdate={this.choresListUpdate}/>

      </div>
    );
  }
};

export default ChoresPage;

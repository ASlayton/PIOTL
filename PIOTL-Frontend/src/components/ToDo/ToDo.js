import './ToDo.css';
import React from 'react';
import api from '../../api-access/api';
const moment = require('moment');

class ToDo extends React.Component {
  constructor (props) {
    super(props);
    this.updateChore = this.updateChore.bind(this);
    this.state = {
      Chores: [],
      updatedChore: {}
    };
  }

  componentDidUpdate = () => {
    if (!this.props.user || this.state.Chores.length) return;
    api.apiGet('ChoresList/ChoresListByUser/' + this.props.user.id)
      .then(res => {
        const currentChores = [];
        res.data.forEach((chore) => {
          if (moment().isSame(moment(chore.dateDue), 'day')) {
            currentChores.push(chore);
          };
        });
        this.setState({Chores: currentChores});
      })
      .catch((err) => {
        console.error('Error with ToDo get request', err);
      });
  }

  getTypeId = (typeName) => {
    let myValue = 0;
    console.log('props: ', this.props);
    this.props.chores.forEach((chore) => {
      if (chore.name === typeName) {
        myValue = chore.id;
      }
    });
    return myValue;
  }

  updateChore = (id, e) => {
    const myValue = e.target.checked;
    const newChore = {...this.state.Chores};
    let updatedChore = {};
    for (let i = 0; i < Object.keys(newChore).length; i++) {
      if (newChore[i].id === id) {
        const newType = this.getTypeId(newChore[i].type);
        console.log('type id: ', newType);
        updatedChore = {
          'id': newChore[i].id,
          'dateAssigned': newChore[i].dateAssigned,
          'dateDue': newChore[i].dateDue,
          'completed': myValue,
          'type': newType,
          'assignedTo': newChore[i].assignedTo,
          'familyId': this.props.user.familyId
        };
      };
      console.log(updatedChore);
      this.setState({updatedChore});
    };

    api.apiPut('ChoresList', this.state.updatedChore)
      .then(res => {
        console.log('Successful update to choreslist', res);
      })
      .catch((err) => {
        console.error('There was an error in put request to Choreslist', err);
      });
  };

  render () {
    let count = 1;
    const ToDoList = this.state.Chores.map((ToDo) => {
      count++;
      return (
        <li className='ToDoToday-container' key={'ToDoToday' + count}>
          <div>
            <input type='checkbox' name={'today' + count} value={ToDo.type + ':' + ToDo.dateDue} onChange={(e) => this.updateChore(ToDo.id, e)}/>
          </div>
          <div>
            <p>{ToDo.type}</p>
          </div>
        </li>
      );
    });
    return (
      <div>
        <div>
          <h1>To Do Today</h1>
        </div>
        <ul>
          {ToDoList}
        </ul>
      </div>
    );
  }
};

export default ToDo;

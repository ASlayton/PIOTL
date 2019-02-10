import './PastDue.css';
import React from 'react';
import api from '../../api-access/api';
const moment = require('moment');

class PastDue extends React.Component {
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
          if (moment().isAfter(moment(chore.dateDue), 'day') && !chore.completed) {
            currentChores.push(chore);
          };
        });
        this.setState({Chores: currentChores});
      })
      .catch((err) => {
      });
  }

  getTypeId = (typeName) => {
    let myValue = 0;
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
        updatedChore = {
          'id': newChore[i].id,
          'dateAssigned': newChore[i].dateAssigned,
          'dateDue': newChore[i].dateDue,
          'completed': myValue,
          'type': newType,
          'assignedTo': newChore[i].assignedTo,
          'assignedBy': newChore[i].assignedBy,
          'familyId': this.props.user.familyId
        };
      };
      this.pushThisShit(updatedChore);
      this.setState({updatedChore: updatedChore});
    };
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

    render () {
      let count = 1;
      const ToDoList = this.state.Chores.map((ToDo) => {
        count++;
        return (
          <li className='ToDoToday-container' key={'ToDoToday' + count}>
            <div>
              <input type='checkbox' name={'today' + count} value={ToDo.type} defaultChecked={ToDo.completed} onChange={(e) => this.updateChore(ToDo.id, e) }/>
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
            <h1>Past Due</h1>
          </div>
          <ul>
            {ToDoList}
          </ul>
        </div>
      );
    }
};

export default PastDue;

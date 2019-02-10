import './ToDoWeek.css';
import React from 'react';
import api from '../../api-access/api';
import Alert from 'react-bootstrap/Alert';
const moment = require('moment');

class ToDoWeek extends React.Component {
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
        const startDate = moment().startOf('week');
        const endDate = moment().endOf('week');
        const currentChores = [];
        res.data.forEach((chore) => {
          if (moment(chore.dateDue).isBetween(startDate, endDate)) {
            currentChores.push(chore);
          };
        });
        this.setState({Chores: currentChores});
      })
      .catch((err) => {
        return (
          <Alert variant='danger'>
            There was an error in retrieving Choreslist.
          </Alert>
        );
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
    };
    this.pushThisShit(updatedChore);
    this.setState({updatedChore: updatedChore});
  };

    pushThisShit = (myObject) => {
      api.apiPut('ChoresList', myObject)
        .then(res => {
          console.log('Success in updating choreslist');
          return (
            <Alert variant='success'>
              Successfully updated choreslist.
            </Alert>
          );
        })
        .catch((err) => {
          console.error('Success in updating choreslist', err);
          return (
            <Alert variant='danger'>
              There was an error while updating choreslist.
            </Alert>
          );
        });
    };

    render () {
      let count = 1;
      const ToDoWeekList = this.state.Chores.map((ToDoWeek) => {
        console.log('ToDoWeek type: ', ToDoWeek.type);
        count++;
        return (
          <li className='ToDoWeekToday-container' key={'ToDoWeekToday' + count}>
            <div>
              <input type='checkbox' name={'today' + count} value={ToDoWeek.type} onChange={(e) => this.updateChore(ToDoWeek.id, e)} defaultChecked={ToDoWeek.completed}/>
            </div>
            <div>
              <p>{ToDoWeek.type}</p>
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
            {ToDoWeekList}
          </ul>
        </div>
      );
    }
};

export default ToDoWeek;

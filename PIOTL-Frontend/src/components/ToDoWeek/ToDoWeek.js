import './ToDoWeek.css';
import React from 'react';
import apiAccess from '../../api-access/api';
const moment = require('moment');
// IF NOT SIGNED IN, USER IS DIRECTED HERE
class ToDoWeek extends React.Component {
  state = {
    Chores: [],
  };

  componentDidUpdate = () => {
    if (!this.props.user || this.state.Chores.length) return;
    apiAccess.apiGet('ChoresList/ChoresListByUser/' + this.props.user.id)
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
        console.error('Error with ToDo get request', err);
      });
  }

  render () {
    let count = 1;
    const ToDoWeekList = this.state.Chores.map((ToDo) => {
      count++;
      return (
        <li className="ToDoToday-container" key={'ToDoToday' + count}>
          <div>
            <p>{ToDo.assignedTo}</p>
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
          <h1>To Do This Week</h1>
        </div>
        <ul>
          {ToDoWeekList}
        </ul>
      </div>
    );
  }
};

export default ToDoWeek;

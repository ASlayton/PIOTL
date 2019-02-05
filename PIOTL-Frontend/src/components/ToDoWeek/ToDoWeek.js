import './ToDoWeek.css';
import React from 'react';
import apiAccess from '../../api-access/api';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class ToDoWeek extends React.Component {
  state = {
    Chores: [],
  };

  componentDidUpdate = () => {
    if (!this.props.user || this.state.Chores.length) return;
    apiAccess.apiGet('ChoresList/ChoresListByUserNarrow/' + this.props.user.id)
      .then(res => {
        this.setState({Chores: res.data});

      })
      .catch((err) => {
        console.error('Error with ToDoWeek get request', err);
      });
  }

  render () {
    // this.getToDos();
    let count = 1;
    const ToDoList = this.state.Chores.map((ToDo) => {
      count++;
      return (
        <li className="ToDoWeek-container" key={'ToDoWeek' + count}>
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
          {ToDoList}
        </ul>
      </div>
    );
  }
};

export default ToDoWeek;

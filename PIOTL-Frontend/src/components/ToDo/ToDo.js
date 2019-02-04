import './ToDo.css';
import React from 'react';
import apiAccess from '../../api-access/api';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class ToDo extends React.Component {
  state = {
    Chores: [],
  };

  componentDidUpdate = () => {
    if (!this.props.user || this.state.Chores.length) return;

    apiAccess.apiGet('Chores/chorebyUser/' + this.props.user.id)
      .then(res => {
        this.setState({Chores: res.data});
        console.error('I am being called.');
      })
      .catch((err) => {
        console.error('Error with ToDo get request', err);
      });
  }

  render () {
    // this.getToDos();
    let count = 1;
    const ToDoList = this.state.Chores.map((ToDo) => {
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
          <h1>ToDos</h1>
        </div>
        <ul>
          {ToDoList}
        </ul>
      </div>
    );
  }
};

export default ToDo;

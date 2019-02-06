import './ChoresPage.css';
import React from 'react';
import api from '../../api-access/api';
import auth from '../../firebaseRequests/auth';

class ChoresPage extends React.Component {

  state = {
    user: {},
    family: [],
    chores: [],
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

  componentDidUpdate () {
    if (!this.state.user || this.state.family.length) return;
    api.apiGet('User/familyMembers/' + this.state.user.familyId)
      .then(res => {
        const data = res.data;
        this.setState({family: data});
        this.state.family.forEach((member) => {
          api.apiGet('ChoresListByUser/' + member.id)
            .then(eachRes => {
              const singleData = eachRes.data;
              this.setState({member.chores: singleData});
            })
        });
      });

  }
  render () {
    const tasks = {};
    const familyContainer = this.state.family.map((member) => {
      tasks[member.firstName] = [];
      return (
        <div className={member.firstName}>
          <span className="name-header">{member.firstName}</span>
        </div>
      );
    });

    const myChores = this.state.chores.map((chore) => {
      chore['assignedTo'] = 'Undone';
      return (
        <div className="draggable" draggable>{chore.name}</div>
      );
    });

    return (
      <div className="container-drag">
        <h2>Drag and Drop Chores</h2>

        <div>{familyContainer}</div>
        <div className="droppable" onDragOver={(e) => this.onDragOver(e)}>
          <h3>Chores List</h3>
          {myChores}
        </div>

      </div>
    );
  }
};

export default ChoresPage;

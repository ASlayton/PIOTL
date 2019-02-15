import './ChoresForm.css';
import React from 'react';
import Calendar from 'react-calendar';
import api from '../../api-access/api';
const moment = require('moment');

class ChoresForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      date: new Date(),
      chosenMember: '',
      chosenChore: ''
    };
    this.assignChore = this.assignChore.bind(this);
  }

  getmemberId = () => {
    let myid = 0;
    this.props.family.forEach((member) => {
      if (member.firstName === this.state.chosenMember) {
        myid = member.id;
      };
    });
    return (myid);
  };

  getTypeId = () => {
    let myid = 0;
    this.props.chores.forEach((chore) => {
      if (chore.name === this.state.chosenChore) {
        myid = chore.id;
      };
    });
    return (myid);
  };

  assignChore = (e) => {
    e.preventDefault();
    const member = this.getmemberId();
    const typeid = this.getTypeId();
    const newChore = {
      dateAssigned: moment().format('YYYY-MM-DD'),
      dateDue: moment(this.state.date).format('YYYY-MM-DD'),
      completed: false,
      assignedTo: member,
      assignedBy: this.props.user.id,
      type: typeid,
      familyId: this.props.user.id
    };
    console.log('My chore: ', newChore);
    api.apiPost('ChoresList/', newChore)
      .then(res => {
        console.log('Successful post.', res);
        this.props.choresListUpdate();
      })
      .catch(err => {
        console.error('New chore was not posted to ChoresList', err);
      });

  };

  onChange = date => this.setState({date});
  famChange = (e) => this.setState({chosenMember: e.target.value});
  choreChange = (e) =>  this.setState({chosenChore: e.target.value});

  render () {
    const options = this.props.chores.map((item) => {
      return (
        <option value={item.name}>{item.name}</option>
      );
    });

    const members = this.props.family.map((member) => {
      return (
        <option value={member.firstName}>{member.firstName}</option>
      );
    });

    return (
      <div>
        <h1>Add a chore</h1>
        <form action="">
          <Calendar
            calendarType="US"
            onChange={this.onChange}
            value={this.state.date}
          />
          <label htmlFor="dateInput">Date Selected:</label>
          <input type="text" value={moment(this.state.date).format('MM-DD-YYYY')} readOnly />
          <label htmlFor="choreDropdown">Select Chore:</label>
          <select name="choreDropdown" onChange={this.choreChange}>
            <option hidden>Select chore</option>
            {options}
          </select>
          <label htmlFor="familyMember">Family Member Name:</label>
          <select name="familyMember" onChange={this.famChange}>
            <option hidden>Select family member</option>
            {
              this.props.user.adult ?
                members
                :
                <option value={this.props.user.firstName}>{this.props.user.firstName}</option>
            }
          </select>
          <button onClick={this.assignChore}>Submit</button>
        </form>
      </div>

    );
  }
};

export default ChoresForm;

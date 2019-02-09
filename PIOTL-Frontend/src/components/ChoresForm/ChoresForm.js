import './ChoresForm.css';
import React from 'react';
import Calendar from 'react-calendar';

class ChoresForm extends React.Component {
  state = {
    chores: [],
    date: new Date(),
  };
  onChange = date => this.setState({date});
  famChange = (e) => this.setState({chosenMember: e.target.value});
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
            onChange={this.onChange}
            value={this.state.date}
          />
          <label htmlFor="choreDropdown">Name</label>
          <select name="choreDropdown">
            {options}
          </select>
          <label htmlFor="familyMember"></label>
          <select name="" id="">
            {members}
          </select>
        </form>
      </div>

    );
  }
};

export default ChoresForm;

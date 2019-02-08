import './ChoresForm.css';
import React from 'react';

class ChoresForm extends React.Component {
  state = {
    chores: []
  };

  render () {
    const options = this.props.chores.map((item) => {
      return (
        <option value={item.name}>{item.name}</option>
      );
    });
    return (
      <div>
        <h1>Add a chore</h1>
        <form action="">
          <label htmlFor="choreDropdown">Name</label>
          <select name="choreDropdown">
            {options}
          </select>
        </form>
      </div>

    );
  }
};

export default ChoresForm;

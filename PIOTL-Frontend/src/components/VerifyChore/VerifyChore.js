import './VerifyChore.css';
import React from 'react';
import api from '../../api-access/api';

class VerifyChore extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      needVerification: [],
      family: []
    };
  }

  componentDidUpdate () {
    if (!this.props.user || this.state.family) return;
    api.apiGet('VerifyChore' + this.props.user.familyId)
      .then((res) => {
        this.setState({needVerification: res.data});
      })
      .catch((err) => {
        console.error('There was an error in verification module get.', err);
      });

    api.apiGet('User/familyMembers/' + this.state.user.familyId)
      .then(res => {
        const data = res.data;
        this.setState({family: data});
      });
  };

  getName = (id) => {
    let myValue = 0;
    this.state.family.forEach((member) => {
      if (member.id === id) {
        myValue = member.firstName;
      };
    });
    return myValue;
  }

  rejectCompletion = () => {};
  acceptCompletion = () => {};
  needToBeVerified = () => {
    this.state.needVerification.map((item) => {
      return (
        <li>
          <p>{item.requestedBy} : {item.type}</p>
          <button onClick={this.acceptCompletion}>Accept</button>
          <button onCLick={this.rejectCompletion}>Reject</button>
        </li>
      );
    });
  };
  render () {

    return (
      <div>
        <h3>Please verify the following:</h3>
        <ul>
          {this.needToBeVerified}
        </ul>
      </div>
    );
  };
};

export default VerifyChore;

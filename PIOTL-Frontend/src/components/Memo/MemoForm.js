import './Memo.css';
import React from 'react';
import api from '../../api-access/api';
const moment = require('moment');

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class MemoForm extends React.Component {
  state = {
    memo: ''
  };

  submitMemo = () => {
    const myMemo = {
      userId: this.props.user.id,
      message: this.state.memo,
      dateCreated: moment().format('YYYY-MM-DD')
    };
    api.apiPost('Memo', myMemo)
      .then((res) => {
        console.log('Memo posted successfully');
        this.props.updateMemos(myMemo);
        this.setState({memo: ''});
      })
      .catch((err) => {
        console.error('There was an error while posting memo.', err);
      });
  };

  updateMemoField = (e) => {
    this.setState({memo: e.target.value});
  };

  render () {
    return (
      <div>
        <label htmlFor="memoText">Insert Memo Text:</label>
        <textarea name="memoText" id="memo-textarea" cols="30" rows="2" onChange={this.updateMemoField} value={this.state.memo}></textarea>
        <button onClick={this.submitMemo}>Enter</button>
      </div>
    );
  }
};

export default MemoForm;

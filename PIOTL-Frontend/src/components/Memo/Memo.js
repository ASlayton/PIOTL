import './Memo.css';
import React from 'react';
import apiAccess from '../../api-access/api';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Memo extends React.Component {
  state = {
    memos: [],
  };

  componentDidUpdate = () => {
    if (!this.props.user || this.state.memos.length) return;

    apiAccess.apiGet('Memo/getbyuser/' + this.props.user.id)
      .then(res => {
        this.setState({memos: res.data});
      })
      .catch((err) => {
        console.error('Error with memo get request', err);
      });
  }

  render () {
    // this.getMemos();
    let count = 1;
    const memoList = this.state.memos.map((memo) => {
      count++;
      return (
        <li className="memo-container" key={'memo' + count}>
          <div>
            <p>{memo.dateCreated}</p>
          </div>
          <div>
            <p>{memo.message}</p>
          </div>
        </li>
      );
    });
    return (
      <div>
        <div>
          <h1>Memos</h1>
        </div>
        <ul>
          {memoList}
        </ul>
      </div>
    );
  }
};

export default Memo;

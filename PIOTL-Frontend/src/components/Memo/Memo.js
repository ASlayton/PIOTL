import './Memo.css';
import React from 'react';
import apiAccess from '../../api-access/api';
import api from '../../api-access/api';
import MemoForm from './MemoForm';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Memo extends React.Component {
  constructor (props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      memos: [],
    };
  };

  updateMemos = (newMemo) => {
    const memos = [...this.state.memos];
    memos.push(newMemo);
    this.setState({memos});
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

  removeItem = (id, e) => {
    e.preventDefault();
    api.apiDelete('memo/' + id)
      .then (res => {
        console.log('Delete was successful.');
        apiAccess.apiGet('Memo/getbyuser/' + this.props.user.id)
          .then(res => {
            this.setState({memos: res.data});
          })
          .catch((err) => {
            console.error('Error with memo get request', err);
          });
      })
      .catch (err => {
        console.error('There was an issue with deleting memo');
      });
  };

  render () {
    // this.getMemos();
    let count = 1;
    const memoList = this.state.memos.map((memo) => {
      count++;
      return (
        <li className="memo-container" key={'memo' + count}>
          <div>
            <p>{memo.dateCreated}</p>
            <p>{memo.message}</p>
          </div>
          <div>
            <button className="close" onClick={(e) => this.removeItem(memo.id, e)}>Delete</button>
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
        <div>
          <MemoForm user={this.props.user} updateMemos={this.updateMemos}/>
        </div>
      </div>
    );
  }
};

export default Memo;

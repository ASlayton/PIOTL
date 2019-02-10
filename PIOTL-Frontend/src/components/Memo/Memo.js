import './Memo.css';
import React from 'react';
import apiAccess from '../../api-access/api';
import api from '../../api-access/api';
import Alert from 'react-bootstrap/Alert';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Memo extends React.Component {
  constructor (props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      memos: [],
    };
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
        return (
          <Alert>
            There was an issue while deleting from memoList.
          </Alert>
        );
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
      </div>
    );
  }
};

export default Memo;

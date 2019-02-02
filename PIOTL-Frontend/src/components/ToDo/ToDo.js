import './Memo.css';
import React from 'react';
import apiAccess from '../../api-access/api';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Home extends React.Component {
  state = {
    memos: [],
  }

  componentDidMount () {
    console.error('User:', this.props);
    apiAccess.apiGet('Memo/' + 1)
      .then(res => {
        const data = this.state.memos.concat(res.data);
        this.setState({memos: data});
      })
      .catch((err) => {
        console.error('Error with memo get request', err);
      });
  };

  render () {
    const memoList = this.state.memos.map((memo) => {
      return (
        <li className="memo-container">
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

export default Home;

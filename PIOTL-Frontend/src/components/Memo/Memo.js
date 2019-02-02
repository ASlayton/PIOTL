import './Memo.css';
import React from 'react';
import apiAccess from '../../api-access/api';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Home extends React.Component {
  state = {
    memos: [],
  }

  componentDidMount () {
    apiAccess.apiGet('Memo')
      .then(res => {
        const data = res.data;
        console.error('My memos:', data);
        this.setState({memos: data});
      })
      .catch((err) => {
        console.error('Error with memo get request', err);
      });
  };

  render () {
    const memoList = this.state.memos.map((memo) => {
      return (
        <div className="memo-container">
          <div>
            <p>{memo.dateCreated}</p>
          </div>
          <div>
            <p>{memo.message}</p>
          </div>
        </div>
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

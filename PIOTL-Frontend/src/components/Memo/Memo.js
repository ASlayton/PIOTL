import './Memo.css';
import React from 'react';
import apiAccess from '../../api-access/api';

// IF NOT SIGNED IN, USER IS DIRECTED HERE
class Home extends React.Component {
  state = {
    memos: [],
    objectModel: {
      id: 0,
      userId: '',
      message: '',
      dateCreated: date,

    }
  }
  getcustomers = () => {
    apiAccess.apiGet('memos')
      .then(res => {
        const data = res.data;
        this.setState({memos: data});
      });
  }

  render () {
    return (
      <div>
        <div>

        </div>
      </div>
    );
  }
};

export default Home;

import './ChoresCard.css';
import React from 'react';

class ChoresPage extends React.Component {

  render () {
    const taskCards = () => {
      this.props.tasks.map((item) => {
        return (
          <div>
            <h1>{item}</h1>
          </div>
        );
      });
    };
    return (
      <div>
        <div>{taskCards}</div>
      </div>
    );
  }
};

export default ChoresPage;

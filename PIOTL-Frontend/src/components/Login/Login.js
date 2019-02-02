import React from 'react';
import { Link } from 'react-router-dom';
import fb from '../../firebaseRequests/index';
import './Login.scss';
import api from '../../api-access/api';

class Login extends React.Component {

  state = {
    user: {
      email: '',
      password: '',
    },
  }

  onInputChange = (e) => {
    const { user } = { ...this.state };
    user[e.target.id] = e.target.value;
    this.setState({ user });
  }

  submitLogin = (e) => {
    e.preventDefault();
    const { user } = this.state;

    // Send user to firebase auth method
    fb.auth.loginUser(user)
      .then((response) => {
        api.apiGet(`user/login/${response.user.uid}`)
          .then(apiResponse => this.props.signin(apiResponse.data))
          .catch(err => console.error(err));
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({isError: true, error: err.message});
      });
  };

  render () {
    return (
      <div className='LoginForm'>
        <h2>Login to PIOTL!</h2>
        <div className="container">
          <div className="row justify-content-center">
            <form className='card' onSubmit={this.submitLogin}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" className="form-control" placeholder="Enter email" value={this.state.user.email} onChange={this.onInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Password" value={this.state.user.password} onChange={this.onInputChange} />
              </div>
              {
                this.state.isError ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null
              }
              <button type="submit" className="btn btn-primary">Login</button>
              <small><Link to="/register">Don't have an account?</Link></small>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import fb from '../../firebaseRequests/index';
import './Register.scss';
import api from '../../api-access/api';

class Register extends React.Component {

  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  }

  onInputChange = (e) => {
    const { user } = { ...this.state };
    user[e.target.id] = e.target.value;
    this.setState({ user });
  }

  submitRegistration = (e) => {
    e.preventDefault();
    const { user } = this.state;

    // Send user to firebase auth method
    fb.auth.registerUser(user)
      .then(fbUser => {
        // Add firebase uid to user object
        user.firebaseId = fbUser.user.uid;

        const newCustomer = {
          firstName: user.firstName,
          lastName: user.lastName,
          firebaseId: user.firebaseId,
        };
        api.apiPost('user/register', newCustomer).then(response => {
          this.props.signin(response.data);
          this.props.history.push('/');
        });
      })
      .catch(err => {
        this.setState({isError: true, error: err.message});
      });

  }
  render () {
    return (
      <div className='LoginForm'>
        <h2>Sign up for PIOTL!</h2>
        <div className="container">
          <div className="row justify-content-center">
            <form className='card' onSubmit={this.submitRegistration}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" className="form-control" placeholder="Enter email" value={this.state.user.email} onChange={this.onInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Password" value={this.state.user.password} onChange={this.onInputChange} />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" className="form-control" placeholder="John" value={this.state.user.firstName} onChange={this.onInputChange} />
                </div>
                <div className="form-group col">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" className="form-control" placeholder="Smith" value={this.state.user.lastName} onChange={this.onInputChange} />
                </div>
              </div>
              {
                this.state.isError ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null
              }
              <button type="submit" className="btn btn-primary">Register</button>
              <small><Link to="/login">Already registered?</Link></small>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;

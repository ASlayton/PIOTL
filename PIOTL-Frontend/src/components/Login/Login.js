import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from '../../firebaseRequests/auth';
import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  // LOGIN BUTTON IS CLICKED, FIREBASE METHOD IS USED
  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch(error => {
        console.error('there was an error in Login', error);
      });
  };

  // ALLOW EMAIL INPUT FIELD TO CHANGE
  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  // ALLOW PASSWORD INPUT FIELD TO CHANGE
  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className="Login">
        <div id="login-form">
          <h1 className="text-center">Login</h1>
          <form className="form-horizontal col-sm-6 col-sm-offset-3">
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Enter Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password:
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Enter Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <Link className="link-style" to="/register">Click here to register</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

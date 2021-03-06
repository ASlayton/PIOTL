import React from 'react';
import { Link } from 'react-router-dom';
import fb from '../../firebaseRequests/index';
import './Register.scss';
import api from '../../api-access/api';

class Register extends React.Component {
  constructor (props) {
    super(props);
    this.postMyFamily = this.postMyFamily.bind();
    this.state = {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      haveFamily: false,
      familyName: '',
      familyId: 1,
      isChild: true
    };
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
          adult: !this.state.isChild,
          familyId: this.state.familyId,
          earned: 0
        };
        api.apiPost('User', newCustomer)
          .then(response => {
            this.props.signin(response.data);
            this.props.history.push('/');
          })
          .catch((err) => {
            console.log('I am not posting your user', err);
          });
      })
      .catch(err => {
        this.setState({isError: true, error: err.message});
      });

  }
  changeHandler1 = (e) => {
    if (e.target.value) {
      this.setState({haveFamily: true});
    } else {
      this.setState({haveFamily: false});
    };
  }

  changeHandler2 = (e) => {
    if (e.target.value) {
      this.setState({haveFamily: false});
    } else {
      this.setState({haveFamily: false});
    };
  }

  isChildHandler1 = (e) => {
    if (e.target.value) {
      this.setState({isChild: false});
    }
  };

  isChildHandler2 = (e) => {
    if (e.target.value) {
      this.setState({isChild: true});
    }
  };

  haveFamilyNameHandler = (e) => {
    const familyName = e.target.value;
    this.setState({familyId: 0});
    this.setState({familyName: familyName});
  };

  haveFamilyIdHandler = (e) => {
    const familyId = parseInt(e.target.value);
    this.setState({familyName: ''});
    this.setState({familyId: familyId});
  };

  postMyFamily = () => {
    const familyName = {};
    familyName.name = this.state.familyName;
    console.log('familyName: ', familyName);
    api.apiPost('Family', familyName)
      .then((res) => {
        api.apiGet('Family/Family/' + familyName.name)
          .then((res) => {
            this.setState({familyId: res.data.id});
          })
          .catch((err) => {
            console.error(
              'There was an error in retreiving family id', err
            );
          });
      })
      .catch((err) => {
        console.error('There was an error in posting family name', err);
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
                <div className="form-group col">
                  <p>Is your family already registered?</p>
                  <input type="radio" id="havefamily-yes" name="family" onChange={this.changeHandler1}/>
                  <label htmlFor="haveFamily-yes">Yes</label>

                  <input type="radio" id="havefamily-no" name="family" onChange={this.changeHandler2}/>
                  <label htmlFor="haveFamily_no">No</label>
                  {
                    this.state.haveFamily ? (
                      <div>
                        <input type="text" placeholder="Insert Family Id Number" onChange={this.haveFamilyIdHandler} />
                        <input type="text" placeholder="Enter your family name"  onChange={this.haveFamilyNameHandler} hidden />
                      </div>

                    ) : <div>
                      <input type="text" placeholder="Insert Family Id Number" onChange={this.haveFamilyIdHandler} hidden />
                      <input type="text" placeholder="Enter your family name"  onChange={this.haveFamilyNameHandler} />
                      <button onClick={this.postMyFamily}>Create Family Entry</button>
                    </div>
                  }
                </div>
              </div>
              {
                this.state.isError ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null
              }

              <div>
                <p>Are you a parent/guardian?</p>
                <input type="radio" name="admin" id="isChild" onChange={this.isChildHandler1}/>
                <label htmlFor="isChild">Yes</label>
                <input type="radio" name="admin" id="isNotChild" onChange={this.isChildHandler2}
                />
                <label htmlFor="isNotChild">No</label>
              </div>
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

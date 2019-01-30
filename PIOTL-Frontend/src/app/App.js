// IMPORT NECCESSARY FILES
import React from 'react';
import firebase from 'firebase';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import fbConnection from '../firebaseRequests/connection';
import './App.css';
import LandingPage from '../components/LandingPage/LandingPage';

// START FIREBASE CONNECTION
fbConnection();

// DEFINE PRIVATE ROUTE
const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/LandingPage'}}
          />
        )
      }
    />
  );
};

// DEFINE PUBLIC ROUTE
const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/Home'}}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  wentAway = () => {
    this.setState({authed: false});
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Navbar
              authed={this.state.authed}
              wentAway={this.wentAway}
            />
            <div>
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <PublicRoute
                  path="/LandingPage"
                  authed={this.state.authed}
                  component={LandingPage}
                />
                <PublicRoute
                  path="/login"
                  authed={this.state.authed}
                  component={Login}
                />
                <PublicRoute
                  path="/register"
                  authed={this.state.authed}
                  component={Register}
                />
                <PrivateRoute
                  path="/Home"
                  authed={this.state.authed}
                  component={Home}
                />

              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
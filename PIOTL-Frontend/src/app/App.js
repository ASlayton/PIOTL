// IMPORT NECCESSARY FILES
import React from 'react';
import firebase from 'firebase';
import {BrowserRouter, Route, Switch, Redirect}  from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import fbConnection from '../firebaseRequests/connection';
import './App.css';
import LandingPage from '../components/LandingPage/LandingPage';
import Home from '../components/Home/Home';
import ChoresPage from '../components/ChoresPage/ChoresPage';
import Navbar from '../components/Navbar/Navbar';

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
            to={{ pathname: '/Home'}}
          />
        )
      }
    />
  );
};

// // DEFINE PUBLIC ROUTE
const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
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

class App extends React.Component {
  state = {
    authed: false,
    user: {},
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
            <header>
              <Header authed={this.state.authed} wentAway={this.wentAway} user={this.state.user} />

            </header>
            <Navbar />
            <div className="row">
              <Switch>
                <PrivateRoute
                  path="/Home"
                  authed={this.state.authed}
                  component={Home}
                />
                <Route
                  path="/LandingPage"
                  component={LandingPage}
                  authed={this.state.authed}
                />
                <PublicRoute
                  path="/register"
                  authed={this.state.authed}
                  component={Register}
                  signin={this.signin}
                />
                <PublicRoute
                  path="/login"
                  authed={this.state.authed}
                  component={Login}
                />
                <Route
                  path="/ChoresPage"
                  authed={this.state.authed}
                  component={ChoresPage}
                />
                <Route path='*' component={LandingPage} />
              </Switch>
            </div>
            <footer>
              <Footer />
            </footer>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

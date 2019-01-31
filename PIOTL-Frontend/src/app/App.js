// IMPORT NECCESSARY FILES
import React from 'react';
import firebase from 'firebase';
import {BrowserRouter, Route, Switch, Redirect}  from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
// import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
// import Home from '../components/Home/Home';
import fbConnection from '../firebaseRequests/connection';
import './App.css';
import LandingPage from '../components/LandingPage/LandingPage';

// START FIREBASE CONNECTION
fbConnection();

// DEFINE PRIVATE ROUTE
// const PrivateRoute = ({ component: Component, authed, ...rest}) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authed === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: '/LandingPage'}}
//           />
//         )
//       }
//     />
//   );
// };

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
              <Header />
            </header>
            <div className="row">
              <Switch>
                <Route path="/" exact />
                <PublicRoute
                  path="/LandingPage"
                  component={LandingPage} authed={this.state.authed}/>
                <PublicRoute
                  path="/register"
                  authed={this.state.authed}
                  component={Register}
                />
                <PublicRoute
                  path="/login"
                  authed={this.state.authed}
                  component={Login}
                />
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

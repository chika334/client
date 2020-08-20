import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import store from './store'

import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Error from './pages/Error'
import About from './pages/About';
import Profile from './profilepages/Profile';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions'
import PrivateRoute from './ProtectedRoute/PrivateRoute';
import ImageUpload from './components/imageUpload';
// import go from './components/go';
// import hardware from './profilepages/hardware';
// import network from './pages/network';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <PrivateRoute exact path={"/profile"} component={Profile} />
          <Route exact path={"/contact"} component={Contact} />
          <Route exact path={"/about"} component={About} />
          <Route exact path={"/imageUpload"} component={ImageUpload} />
          {/* <Route exact path={"/hardware"} component={hardware} /> */}
          {/* <Route exact path={"/network"} component={network} /> */}
          <Route exact component={Error} />
        </Switch>
        <Footer />
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from './actions';
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import WithAuth from "./components/WithAuth";
import SearchResults from "./components/SearchResults";
import User from "./components/User";
import PostDetails from "./components/PostDetails";

class App extends Component {
  state = {
    loggedIn: false,
    APP_NAME: 'Instagram Clone'
  };

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Switch>
              <Route  path="/login" component={Login} />
              <Header APP_NAME={this.state.APP_NAME}/>
            </Switch>
              {/*<Route exact*/}
                  {/*path='/'*/}
                  {/*render={(props) => <Home {...props} isAuthed={this.state.loggedIn} />}*/}
              {/*/>*/}
            <Route path="/search/:query" component={WithAuth(SearchResults)} />
            <Route path="/users/:username" component={WithAuth(User)} />
              <Route path="/posts/:post_id" component={WithAuth(PostDetails)} />
            <Route exact path="/" component={WithAuth(Home)} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null,actions)(App);

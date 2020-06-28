import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Todo from "./components/todo";
import NotFound from "./components/notFound";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header w100">
          <span className="App-icon fleft" />
          <Link to="/" className="App-name fleft cpointer">
            To Do App
          </Link>
        </header>

        <div className="App-container fleft">
          <Switch>
            <Route exact path="/" component={Todo} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

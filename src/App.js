import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Todo from "./components/todo";

class App extends Component {
  render() {
    // redirect default page to todo page
    const App = () => (
      <Switch>
        <Redirect exact from="/" to="todo" />
        <Route exact path="/todo" component={Todo} />
      </Switch>
    );

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
            <App />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

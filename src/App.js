import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Todo from "./components/todo";
import NotFound from "./components/notFound";

class App extends Component {

  renderRedirect = () => {
    let search = window.location.search;
    if(search.indexOf("?p=") !== -1) {
      let url = window.location.pathname + window.location.search.slice(3);
      console.log("url new=================== ", url);
      return <Redirect to={url} />
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderRedirect() }
        <header className="App-header w100">
          <span className="App-icon fleft" />
          <Link to="/todo/" className="App-name fleft cpointer">
            To Do App
          </Link>
        </header>

        <div className="App-container fleft">
          <Switch>
            <Route exact path="/todo/" component={Todo} />
            <Route path="/todo/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

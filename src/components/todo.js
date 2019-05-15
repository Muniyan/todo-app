import React, { Component } from "react";
import "../App.css";
import Task from "../components/task";
import Item from "../components/item";
import CompletedList from "../components/completedList";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      editItem: "",
      todo: [],
      completed: []
    };
  }

  // Fetching todo info from local storage
  componentDidMount = () => {
    var todoArr = this.getItem("vivriti-Todo");
    if (todoArr && todoArr.length > 0) {
      this.updateState("todo", JSON.parse(todoArr));
    }

    var completedArr = this.getItem("vivriti-Todo-completed");
    if (completedArr && completedArr.length > 0) {
      this.updateState("completed", JSON.parse(completedArr));
    }
  };

  // Update state info
  updateState = (key, value) => {
    let sobj = {};
    sobj[key] = value;
    this.setState(sobj);
  };

  // Set state info in local storage
  setItem = (key, value) => {
    window.localStorage.setItem(key, value);
  };

  // Fetch state info from local storage
  getItem = key => {
    return window.localStorage.getItem(key);
  };

  // Check name is exists in todo list
  isTodoItemExists = localName => {
    return this.isItemExists(localName, this.state.todo);
  };

  // Check name is exists in completed list
  isCompletedItemExists = localName => {
    return this.isItemExists(localName, this.state.completed);
  };

  // Check name is exists or not
  isItemExists = (localName, list) => {
    var isExists = false;
    localName = localName.trim();
    list.forEach(obj => {
      if (localName === obj.name) {
        isExists = true;
      }
    });
    return isExists;
  };

  // Default render function
  render() {
    return (
      <div className="Todo-parent w100 tcenter">
        <div className="Todo-main">
          <Item
            todo={this.state.todo}
            newItem={this.state.newItem}
            isItemExists={this.isTodoItemExists}
            updateState={this.updateState}
            setItem={this.setItem}
          />
          <Task
            todo={this.state.todo}
            editItem={this.state.editItem}
            completed={this.state.completed}
            isItemExists={this.isTodoItemExists}
            updateState={this.updateState}
            setItem={this.setItem}
          />
          <CompletedList
            completed={this.state.completed}
            isItemExists={this.isCompletedItemExists}
            updateState={this.updateState}
            setItem={this.setItem}
          />
        </div>
      </div>
    );
  }
}

export default Todo;

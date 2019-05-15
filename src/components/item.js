import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);

    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }

  // update modified text in newItem
  handleAddChange = event => {
    this.props.updateState("newItem", event.target.value);
  };

  // Add new item in todo list after validation
  handleAddSubmit = event => {
    event.preventDefault();
    var localName = this.props.newItem;

    localName = localName.trim();
    if (localName.length === 0) {
      alert("Item name is required");
    } else if (localName.length < 5) {
      alert("Item name must be at least 5 characters");
    } else if (this.props.isItemExists(localName)) {
      alert("Item name is already exists");
    } else {
      var localTodo = this.props.todo;
      localTodo.push({
        id: new Date().getTime(),
        name: localName
      });

      this.props.updateState("newItem", "");
      this.props.updateState("todo", localTodo);
      this.props.setItem("vivriti-Todo", JSON.stringify(localTodo));

      document.getElementById("addNewItem").value = "";
    }
  };

  // Default render function
  render() {
    return (
      <div className="Todo-child">
        <h1 className="Todo-h1">ADD ITEM</h1>
        <div className="w100">
          <div className="Todo-add-main">
            <input
              id="addNewItem"
              className="Todo-add-input"
              type="text"
              onChange={this.handleAddChange}
              autoFocus
            />
            <button
              className="Todo-add-button cpointer"
              onClick={this.handleAddSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;

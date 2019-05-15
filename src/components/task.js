import React, { Component } from "react";
import jQuery from "jquery";

class Task extends Component {
  constructor(props) {
    super(props);

    this.handleTodoEdit = this.handleTodoEdit.bind(this);
    this.handleTodoSave = this.handleTodoSave.bind(this);
    this.handleTodoBlur = this.handleTodoBlur.bind(this);
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
    this.handleTodoCheckbox = this.handleTodoCheckbox.bind(this);
    this.handleTodoCompleted = this.handleTodoCompleted.bind(this);
  }

  // Show Completed button while check the checkbox
  // Show Edit and Delele while uncheck the checkbox
  handleTodoCheckbox = event => {
    var itemId = event.target.getAttribute("data-id");
    var checked = jQuery(event.target).is(":checked");
    if (checked) {
      jQuery("#parent" + itemId)
        .find(".todoEdit, .todoSave, .todoDelete")
        .hide();
      jQuery("#parent" + itemId)
        .find(".todoCompleted")
        .show();
    } else {
      jQuery("#parent" + itemId)
        .find(".todoEdit, .todoDelete")
        .show();
      jQuery("#parent" + itemId)
        .find(".todoSave, .todoCompleted")
        .hide();
    }
  };

  // Go back to old state while blur the input box
  // Show Edit button and hide Save button
  handleTodoBlur = event => {
    event.target.disabled = true;
    var itemId = event.target.getAttribute("id");
    jQuery("#parent" + itemId)
      .find(".todoEdit")
      .show();
    jQuery("#parent" + itemId)
      .find(".todoSave")
      .hide();

    var dvalue = event.target.getAttribute("dvalue");
    jQuery("#" + itemId).val(dvalue);
  };

  handleTodoChange = event => {
    this.props.updateState("editItem", event.target.value);
  };

  // Show Save button and hide Edit button while clicking on Edit button
  handleTodoEdit = event => {
    var itemId = event.target.getAttribute("data-id");
    var itemName = event.target.getAttribute("data-name");
    if (this.props.isItemExists(itemName)) {
      jQuery("#" + itemId).attr("disabled", false);
      jQuery("#" + itemId).focus();

      jQuery("#parent" + itemId)
        .find(".todoEdit")
        .hide();
      jQuery("#parent" + itemId)
        .find(".todoSave")
        .show();
    }
  };

  // Save modified text after validation
  handleTodoSave = event => {
    var localName = this.props.editItem;
    var itemId = event.target.getAttribute("data-id");

    localName = localName.trim();
    if (localName.length === 0) {
      alert("Item name is required");
    } else if (localName.length < 5) {
      alert("Item name must be at least 5 characters");
    } else if (this.props.isItemExists(localName)) {
      alert("Item name is already exists");
    } else {
      var catchedList = this.props.todo;
      catchedList.forEach((itemObj, index) => {
        if (itemId === "" + itemObj.id) {
          catchedList[index] = { id: itemId, name: localName };
        }
      });

      this.props.updateState("editItem", "");
      this.props.updateState("todo", catchedList);
      this.props.setItem("vivriti-Todo", JSON.stringify(catchedList));
    }
  };

  // Delete task from todo list while clicking on delete button
  handleTodoDelete = event => {
    var itemId = event.target.getAttribute("data-id");
    var itemName = event.target.getAttribute("data-name");
    if (this.props.isItemExists(itemName)) {
      var catchedList = this.props.todo;

      catchedList.forEach((itemObj, index) => {
        if (itemId === "" + itemObj.id) {
          catchedList.splice(index, 1);
        }
      });

      this.props.updateState("todo", catchedList);
      this.props.setItem("vivriti-Todo", JSON.stringify(catchedList));
    }
  };

  // Mark task as completed while clicking on Completed button
  handleTodoCompleted = event => {
    var itemId = event.target.getAttribute("data-id");
    var itemName = event.target.getAttribute("data-name");
    if (this.props.isItemExists(itemName)) {
      var catchedCompleted = this.props.completed;
      var catchedList = this.props.todo;

      catchedList.forEach((itemObj, index) => {
        if (itemId === "" + itemObj.id) {
          catchedList.splice(index, 1);
          catchedCompleted.push({
            id: itemId,
            name: itemName
          });
        }
      });

      this.props.updateState("completed", catchedCompleted);
      this.props.setItem(
        "vivriti-Todo-completed",
        JSON.stringify(catchedCompleted)
      );

      this.props.updateState("todo", catchedList);
      this.props.setItem("vivriti-Todo", JSON.stringify(catchedList));
    }
  };

  // Render task list
  renderTodoList = () => {
    var todoArr = this.props.todo;
    var todoLen = todoArr.length;
    if (todoLen > 0) {
      return todoArr.map(object => {
        return (
          <div
            id={"parent" + object.id}
            className="Todo-list-child"
            key={object.id}
          >
            <input
              data-id={object.id}
              type="checkbox"
              onChange={this.handleTodoCheckbox}
            />
            <input
              id={object.id}
              type="text"
              dvalue={object.name}
              className="text-overflow"
              defaultValue={object.name}
              onBlur={this.handleTodoBlur}
              onFocus={this.handleTodoChange}
              onChange={this.handleTodoChange}
              disabled
            />
            <button
              className="todoEdit cpointer fleft"
              data-id={object.id}
              data-name={object.name}
              onClick={this.handleTodoEdit}
            >
              Edit
            </button>
            <button
              className="todoSave cpointer fleft dnone"
              data-id={object.id}
              data-name={object.name}
              onMouseDown={this.handleTodoSave}
            >
              Save
            </button>
            <button
              className="todoDelete cpointer fleft"
              data-id={object.id}
              data-name={object.name}
              onClick={this.handleTodoDelete}
            >
              Delete
            </button>
            <button
              className="todoCompleted cpointer fleft dnone"
              data-id={object.id}
              data-name={object.name}
              onClick={this.handleTodoCompleted}
            >
              Completed
            </button>
          </div>
        );
      });
    } else {
      return (
        <div className="Todo-zero-list">
          <h1 className="tcenter">No Todo list</h1>
        </div>
      );
    }
  };

  // Default render function
  render() {
    return (
      <div className="Todo-child">
        <h1 className="Todo-h1">TODO</h1>
        <div className="w100">
          <div className="Todo-add-main">{this.renderTodoList()}</div>
        </div>
      </div>
    );
  }
}

export default Task;

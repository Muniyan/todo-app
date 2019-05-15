import React, { Component } from "react";

class CompletedList extends Component {
  constructor(props) {
    super(props);

    this.handleComponentDelete = this.handleComponentDelete.bind(this);
  }

  // Render completed list
  renderCompletedList = () => {
    var completedArr = this.props.completed;
    var completedLen = completedArr.length;
    if (completedLen > 0) {
      return completedArr.map(object => {
        return (
          <div className="Todo-list-child" key={object.id}>
            <input
              disabled
              type="text"
              id={object.id}
              defaultValue={object.name}
              className="Todo-list-completed"
            />
            <button
              className="todoDelete cpointer fright"
              data-id={object.id}
              data-name={object.name}
              onClick={this.handleComponentDelete}
            >
              Delete
            </button>
          </div>
        );
      });
    } else {
      return (
        <div className="Todo-zero-list">
          <h1 className="tcenter">No Completed list</h1>
        </div>
      );
    }
  };

  // Delete component list
  handleComponentDelete = event => {
    var itemId = event.target.getAttribute("data-id");
    var itemName = event.target.getAttribute("data-name");
    if (this.props.isItemExists(itemName)) {
      var catchedList = this.props.completed;

      catchedList.forEach((itemObj, index) => {
        if (itemId === "" + itemObj.id) {
          catchedList.splice(index, 1);
        }
      });

      this.props.updateState("completed", catchedList);
      this.props.setItem("vivriti-Todo-completed", JSON.stringify(catchedList));
    }
  };

  // Default render function
  render() {
    return (
      <div className="Todo-child">
        <h1 className="Todo-h1">COMPLETED</h1>
        <div className="w100">
          <div className="Todo-add-main">{this.renderCompletedList()}</div>
        </div>
      </div>
    );
  }
}

export default CompletedList;

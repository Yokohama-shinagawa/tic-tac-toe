import React from "react";
import "./index.css";

function Square(props) {
  return (
    <button
      className={`square ${props.isHighlight ? "highlight" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, isHighlight) {
    return (
      <Square
        value={this.props.squares[i]}
        key={i.toString()}
        onClick={() => this.props.onClick(i)}
        isHighlight={isHighlight}
      />
    );
  }

  render() {
    const items = [];
    const row = 3;
    const line = 3;
    const lineList = this.props.highlight;
    var isHighlight = false;

    for (let i = 0; i < line; i++) {
      let mini_items = [];
      for (let j = 0; j < row; j++) {
        isHighlight = false;
        let num = j + i * 3;
        if (
          lineList &&
          lineList.includes(num)
        ) {
          isHighlight = true;
        }
        mini_items.push(this.renderSquare(num, isHighlight));
      }

      items.push(
        <div className="board-row" key={i.toString()}>
          {mini_items}
        </div>
      );
    }

    return <div>{items}</div>;
  }
}

export default Board;

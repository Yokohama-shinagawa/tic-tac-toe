import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
  class Board extends React.Component {
  
    renderSquare(i) {
      
      return (
        <Square
          value={this.props.squares[i]}
          key={i.toString()}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const items = [];
      const row = 3;
      const line = 3;
      for (let i=0;i < line; i++){
        let mini_items = [];
        for(let j=0; j< row; j++){
          mini_items.push(
            this.renderSquare(j+3*i)
          )
        }
        items.push(
          <div className="board-row" key={i.toString()}>
            {mini_items}
          </div>
        )
      }

      return (
        <div>
          {items}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber:0,
        xIsNext:true,
        order: "ascending",
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0,this.state.stepNumber + 1);
      const current = history[history.length -1]
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      })
    }

    changeOrder(){
      if(this.state.order === "decending"){
        this.setState({
          order: "ascending",
        })
      }else{
        this.setState({
          order: "decending",
        })
      }
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares)

      let moves = history.map((step,move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
          return(
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>
                {desc}
              </button>
            </li>
          )
      })

      if (this.state.order === "decending"){
        moves = moves.reverse()
      }

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0')
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div　className="status">{status}</div>
            <button
              onClick={() => this.changeOrder()}
            >
              {this.state.order} order
            </button>
            <ul>{moves}</ul>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares){
    const lines = [
      [0,1,2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i=0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
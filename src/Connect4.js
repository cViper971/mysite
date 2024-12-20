import React, { useState } from 'react';
import { AImove, checkWinner, getColIndex } from './Connect4ai';
import './Connect4.css';

const Connect4 = () => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(0)));
  const [gameOver, setGameOver] = useState(false)

  const handleClick = (colIndex) => {
    playMove(colIndex,true);
  };

  function playMove(c, p1turn){
    if(gameOver) return;
    const newBoard = board.map(row => [...row]);

    let r = getColIndex(c,board);
    console.log(r);
    newBoard[r][c] = p1turn ? 1 : -1;

    if(checkWinner(newBoard)!=0) setGameOver(true);
    setBoard(newBoard);

    if(p1turn)
      playMove(AImove(newBoard),false);
  }

  const renderCell = (row, col) => {
    return (
      <div
        className={`cell ${board[row][col]!=0 ? (board[row][col] == 1 ? "red" : "yellow") : ''}`}
        onClick={() => handleClick(col)}
      />
    );
  };

  return (
    <div className="connect4-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="connect4-row">
          {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
};

export default Connect4;

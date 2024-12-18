import React, { useState } from 'react';
import './Connect4.css';

const Connect4 = () => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Red');

  const handleClick = (colIndex) => {
    const newBoard = board.map(row => [...row]); // Copy each row to avoid references
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = currentPlayer;
        break;
      }
    }
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
  };

  const renderCell = (row, col) => {
    return (
      <div
        className={`cell ${board[row][col] ? board[row][col].toLowerCase() : ''}`}
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
      <div className="status">
        <p>Current Player: {currentPlayer}</p>
      </div>
    </div>
  );
};

export default Connect4;

import React, { useState } from 'react';
import { AImove, checkWinner, getColIndex } from './Connect4ai';
import './Connect4.css';

const Connect4 = () => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(0)));
  const [gameOver, setGameOver] = useState(false)
  const [aiThinking, setAiThinking] = useState(false);

  const handleClick = (colIndex) => {
    if (gameOver || aiThinking) return;
    playMove(colIndex, true);
  };

  function playMove(c, p1turn, customBoard) {
    if (gameOver) return;
    // Use the provided board or the current board state
    const baseBoard = customBoard ? customBoard.map(row => [...row]) : board.map(row => [...row]);
    let r = getColIndex(c, baseBoard);
    if (r < 0) return; // Prevent placing in full column
    baseBoard[r][c] = p1turn ? 1 : -1;
    if (checkWinner(baseBoard) !== 0) {
      setGameOver(true);
      setBoard(baseBoard);
      return;
    }
    setBoard(baseBoard);
    if (p1turn) {
      setAiThinking(true);
      setTimeout(() => {
        const aiMove = AImove(baseBoard);
        playMove(aiMove, false, baseBoard);
        setAiThinking(false);
      }, 1000);
    }
  }

  const renderCell = (row, col) => {
    return (
      <div
        className={`cell ${board[row][col]!==0 ? (board[row][col] === 1 ? "red" : "yellow") : ''}`}
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

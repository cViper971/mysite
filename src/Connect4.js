import React, { useState } from 'react';
import { AImove, checkWinner, getColIndex, isBoardFull } from './Connect4ai';
import './Connect4.css';

const Connect4 = () => {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(0)));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  /**
   * Handles player clicking on a column
   */
  const handleClick = (colIndex) => {
    if (gameOver || aiThinking) return;
    playMove(colIndex, true);
  };

  /**
   * Resets the game to initial state
   */
  const resetGame = () => {
    setBoard(Array(6).fill().map(() => Array(7).fill(0)));
    setGameOver(false);
    setWinner(null);
    setIsDraw(false);
    setAiThinking(false);
  };

  /**
   * Places a piece on the board and handles game logic
   */
  function playMove(c, p1turn, customBoard) {
    if (gameOver) return;

    // Use the provided board or the current board state
    const baseBoard = customBoard ? customBoard.map(row => [...row]) : board.map(row => [...row]);
    const r = getColIndex(c, baseBoard);

    if (r < 0) return; // Prevent placing in full column

    // Place the piece
    baseBoard[r][c] = p1turn ? 1 : -1;

    // Check for winner
    const winResult = checkWinner(baseBoard);
    if (winResult !== 0) {
      setGameOver(true);
      setWinner(winResult === 1 ? 'Player' : 'AI');
      setBoard(baseBoard);
      return;
    }

    // Check for draw
    if (isBoardFull(baseBoard)) {
      setGameOver(true);
      setIsDraw(true);
      setBoard(baseBoard);
      return;
    }

    setBoard(baseBoard);

    // AI's turn
    if (p1turn) {
      setAiThinking(true);
      setTimeout(() => {
        const aiMove = AImove(baseBoard);
        playMove(aiMove, false, baseBoard);
        setAiThinking(false);
      }, 1000);
    }
  }

  /**
   * Renders a single cell on the board
   */
  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    const cellClass = cellValue !== 0 ? (cellValue === 1 ? "red" : "yellow") : '';

    return (
      <div
        className={`cell ${cellClass}`}
        onClick={() => handleClick(col)}
      />
    );
  };

  /**
   * Returns the current game status message
   */
  const getStatusMessage = () => {
    if (isDraw) return "It's a draw!";
    if (winner) return `${winner} wins!`;
    if (aiThinking) return "AI is thinking...";
    return "Your turn (Red)";
  };

  return (
    <div className="connect4-container">
      <div className="game-status">
        <div className="status-message">{getStatusMessage()}</div>
        <button className="reset-button" onClick={resetGame}>
          New Game
        </button>
      </div>
      <div className="connect4-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="connect4-row">
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect4;

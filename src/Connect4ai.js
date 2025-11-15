/**
 * Checks if there's a winner on the board
 * @param {Array} board - 6x7 game board (1 = player, -1 = AI, 0 = empty)
 * @returns {number} 1 if player wins, -1 if AI wins, 0 if no winner
 */
function checkWinner(board) {
    // Check horizontal wins
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            for (let i = -1; i < 2; i += 2) {
                if (board[r][c] === i && board[r][c + 1] === i &&
                    board[r][c + 2] === i && board[r][c + 3] === i) {
                    return i;
                }
            }
        }
    }

    // Check vertical wins
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            for (let i = -1; i < 2; i += 2) {
                if (board[r][c] === i && board[r + 1][c] === i &&
                    board[r + 2][c] === i && board[r + 3][c] === i) {
                    return i;
                }
            }
        }
    }

    // Check diagonal wins (bottom-left to top-right)
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            for (let i = -1; i < 2; i += 2) {
                if (board[r][c] === i && board[r + 1][c + 1] === i &&
                    board[r + 2][c + 2] === i && board[r + 3][c + 3] === i) {
                    return i;
                }
            }
        }
    }

    // Check diagonal wins (top-left to bottom-right)
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            for (let i = -1; i < 2; i += 2) {
                if (board[r][c] === i && board[r - 1][c + 1] === i &&
                    board[r - 2][c + 2] === i && board[r - 3][c + 3] === i) {
                    return i;
                }
            }
        }
    }

    return 0;
}

/**
 * Determines the best move for the AI player
 * @param {Array} board - Current game board state
 * @returns {number} Column index for the AI's move
 */
function AImove(board) {
    let bestMove = 0;
    let bestScore = Number.MAX_SAFE_INTEGER;

    const validMoves = getValidMoves(board);
    for (const move of validMoves) {
        const r = getColIndex(move, board);
        board[r][move] = -1;
        const score = minimax(10, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true, board);
        board[r][move] = 0;

        if (score < bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

/**
 * Minimax algorithm with alpha-beta pruning
 * @param {number} depth - Remaining search depth
 * @param {number} alpha - Alpha value for pruning
 * @param {number} beta - Beta value for pruning
 * @param {boolean} p1 - True if player 1's turn, false for AI
 * @param {Array} board - Current board state
 * @returns {number} Evaluation score for the position
 */
function minimax(depth, alpha, beta, p1, board) {
    let score = evaluate(board);
    if (score === 1 || score === -1 || depth === 0) {
        return score;
    }

    const moves = getValidMoves(board);
    if (p1) {
        let maxScore = Number.MIN_SAFE_INTEGER;
        for (const move of moves) {
            const r = getColIndex(move, board);
            board[r][move] = 1;
            score = minimax(depth - 1, alpha, beta, false, board);
            maxScore = Math.max(maxScore, score);
            board[r][move] = 0;
            alpha = Math.max(alpha, maxScore);
            if (beta <= alpha) {
                break;
            }
        }
        return maxScore;
    } else {
        let minScore = Number.MAX_SAFE_INTEGER;
        for (const move of moves) {
            const r = getColIndex(move, board);
            board[r][move] = -1;
            score = minimax(depth - 1, alpha, beta, true, board);
            minScore = Math.min(minScore, score);
            board[r][move] = 0;
            beta = Math.min(beta, minScore);
            if (beta <= alpha) {
                break;
            }
        }
        return minScore;
    }
}

/**
 * Evaluates the current board position
 * @param {Array} board - Current board state
 * @returns {number} Evaluation score
 */
function evaluate(board) {
    return checkWinner(board);
}

/**
 * Gets all valid moves (columns that aren't full)
 * Prioritizes center columns for better gameplay
 * @param {Array} board - Current board state
 * @returns {Array} Array of valid column indices
 */
function getValidMoves(board) {
    const moves = [];
    const columnOrder = [3, 2, 4, 1, 5, 0, 6]; // Center-first strategy

    for (const col of columnOrder) {
        if (board[0][col] === 0) {
            moves.push(col);
        }
    }

    return moves;
}

/**
 * Finds the lowest available row in a column
 * @param {number} c - Column index
 * @param {Array} board - Current board state
 * @returns {number} Row index where piece will land, or -1 if column is full
 */
function getColIndex(c, board) {
    let r = -1;
    while (r < 5 && board[r + 1][c] === 0) {
        r++;
    }
    return r;
}

/**
 * Checks if the board is completely full (draw condition)
 * @param {Array} board - Current board state
 * @returns {boolean} True if board is full, false otherwise
 */
function isBoardFull(board) {
    for (let c = 0; c < 7; c++) {
        if (board[0][c] === 0) {
            return false;
        }
    }
    return true;
}

export { AImove, checkWinner, getColIndex, isBoardFull };
function checkWinner(board) {
    for (let r = 0; r < 6; r++)
        for (let c = 0; c < 4; c++)
            for(let i=-1;i<2;i+=2)
                if (board[r][c] == i && board[r][c + 1] == i && board[r][c + 2] == i && board[r][c + 3] == i) 
                  return i;

    for (let c = 0; c < 7; c++)
        for (let r = 0; r < 3; r++)
            for(let i=-1;i<2;i+=2)
                if (board[r][c] == i && board[r + 1][c] == i && board[r + 2][c] == i && board[r + 3][c] == i)
                    return i;

    for (let r = 0; r < 3; r++) 
        for (let c = 0; c < 4; c++)
            for(let i=-1;i<2;i+=2)
                if (board[r][c] == i && board[r + 1][c + 1] == i && board[r + 2][c + 2] == i && board[r + 3][c + 3] == i) 
                    return i;
    
    for (let r = 3; r < 6; r++)
        for (let c = 0; c < 4; c++)
            for(let i=-1;i<2;i+=2)
                if (board[r][c] == i && board[r - 1][c + 1] == i && board[r - 2][c + 2] == i && board[r - 3][c + 3] == i)
                    return i;

    return 0;
}

function AImove(board){
    console.log("ai turn");
    console.log(board);

    let bestMove = 0;
    let bestScore = Number.MAX_SAFE_INTEGER;

    let validMoves = getValidMoves(board);
    for (let move of validMoves) {
        let r = getColIndex(move,board);
        board[r][move] = -1;
        let score = minimax(10, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true, board);
        board[r][move] = 0;

        if (score < bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

function minimax(depth, alpha, beta, p1, board) {
    let score = evaluate(board);
    if (score == 1 || score == -1|| depth == 0)
        return score;
    
    let moves = getValidMoves(board);
    if (p1) {
        let maxScore = Number.MIN_SAFE_INTEGER;
        for (let move of moves) {
            let r = getColIndex(move,board);
            board[r][move] = 1;
            score = minimax(depth - 1, alpha, beta, false, board);
            maxScore = Math.max(maxScore, score);
            board[r][move] = 0;
            alpha = Math.max(alpha, maxScore);
            if (beta <= alpha)
                break;
        }
        return maxScore;
    } else {
        let minScore = Number.MAX_SAFE_INTEGER;
        for (let move of moves) {
            let r = getColIndex(move,board);
            board[r][move] = -1;
            score = minimax(depth - 1, alpha, beta, true, board);
            minScore = Math.min(minScore, score);
            board[r][move] = 0;
            beta = Math.min(beta, minScore);
            if (beta <= alpha)
                break;
        }
        return minScore;
    }
}

function evaluate(board){
    return checkWinner(board);
}

function getValidMoves(board) {
    let moves = [];
    let columnOrder = [3,2,4,1,5,0,6];

    for (let col of columnOrder)
        if (board[0][col] == 0)
            moves.push(col);

    return moves;
}

function getColIndex(c,board){
    let r = -1;
    while(r<5&&board[r+1][c]==0)
        r++;
    
    return r;
}

export {AImove, checkWinner, getColIndex};
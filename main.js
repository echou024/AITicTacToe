document.addEventListener("DOMContentLoaded", () => {
    // Allow for two players to take turns. Assume X always starts the game.
    let currentPlayer = 'X';
    let scoreX = 0;
    let scoreO = 0;
    let movesX = [];
    let movesO = [];
    let gameActive = true;
    let gameState = Array(9).fill(null);
    const newGameButton = document.querySelector('.new_game');
    const resetButton = document.querySelector('.reset');
    const squares = document.querySelectorAll('.row div');
    const displayPlayer = document.querySelector('.display_player');
    const playWithFriendButton = document.querySelector('.play-with-friend');
    const playWithAIButton = document.querySelector('.play-with-ai');
    let isPlayingWithAI = false;

    //Output message to indicate whether its player X's turn or player O's turn. 
    function updateDisplayPlayer() 
    {
        displayPlayer.textContent = `Player ${currentPlayer}'s turn`;
        displayPlayer.style.textAlign = 'center';
    }

    //switch players after each move
    function switchPlayer()
    {
        if (currentPlayer === 'X')
        {
            currentPlayer = 'O';
            aiMove();
            
        } 
        else
        {
            currentPlayer = 'X'
        }

        updateDisplayPlayer();
    }

    function gameWinner()
    {
        const winStates = [
            [0, 1, 2],  // Top row
            [3, 4, 5],  // Middle row
            [6, 7, 8],  // Bottom row
            [0, 3, 6],  // Left column
            [1, 4, 7],  // Center column
            [2, 5, 8],  // Right column
            [0, 4, 8],  // Diagonal from top-left to bottom-right
            [2, 4, 6]   // Diagonal from top-right to bottom-left
        ];
        
        for (state of winStates) {
            const [a, b, c] = state;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];  // Returns X or O
            }
        }

        return null;
    }

    // Maintain the score for each player, i.e. the number of games that player has won. 
    function updateScore(winner)
    {
        if (winner === 'X')
        {
            scoreX = scoreX + 1;
        }
        else if (winner === 'O')
        {
            scoreO = scoreO + 1;
        }
        updateScoreDisplay();
    }

    function updateScoreDisplay() {
        document.getElementById('scoreX').textContent = `Score for X: ${scoreX}`;
        document.getElementById('scoreO').textContent = `Score for O: ${scoreO}`;
    }

    //There should be a "Reset" button that resets the scores as well as the board. 
    function resetGame() 
    {
        gameState.fill(null);
        gameActive = true;
        scoreX = 0; 
        scoreO = 0;
        moveX = [];
        movesO = [];
        squares.forEach(cell => cell.textContent = '');
        updateScoreDisplay();
        updateDisplayPlayer();
    }

    function isBoardFull() {
        return gameState.every(cell => cell !== null);
    }

    function newGame() {
        gameState.fill(null);
        gameActive = true;
        movesX = [];
        movesO = [];
        squares.forEach(cell => cell.textContent = '');
        currentPlayer = 'X'; 
        updateDisplayPlayer();
    }
    
    function updateScore(winner) {
        if (winner === 'X') {
            scoreX++;
        } else if (winner === 'O') {
            scoreO++;
        }
        document.getElementById('scoreX').textContent = `X: ${scoreX}`;
        document.getElementById('scoreO').textContent = `O: ${scoreO}`;
    }

    function aiMove() {
        // Find all available squares
        const availSquares = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === null) {
            availSquares.push(i);
            }
        }

        //choose random
        const randomIndex = Math.floor(Math.random() * availSquares.length);
        const chosenSquare = availSquares[randomIndex];

        
        gameState[chosenSquare] = 'O';
        squares[chosenSquare].textContent = 'O';
        movesO.push(chosenSquare);

        // Check if the AI has won
        const winner = gameWinner();
        if (winner) {
            alert(`Player ${winner} wins!`);
            updateScore(winner);
            gameActive = false;
        } else if (isBoardFull()) {
            alert("The game is a draw!");
            gameActive = false;
        } else {
            switchPlayer();
        }
    }

    function handleCellClick(index) {
        if (gameState[index] === null && gameActive) {
            gameState[index] = currentPlayer;
            squares[index].textContent = currentPlayer;

            if (currentPlayer === 'X') {
                movesX.push(index);
            } else {
                movesO.push(index);
            }

            const winner = gameWinner();
            if (winner) {
                alert(`Player ${winner} wins!`);
                updateScore(winner);
                gameActive = false;
            } else if (isBoardFull()) {
                alert("The game is a draw!");
                gameActive = false;
            } else {
                switchPlayer();
            }
        }
    }

    squares.forEach((cell, index) => cell.addEventListener('click', () => handleCellClick(index)));
    newGameButton.addEventListener('click', newGame);
    resetButton.addEventListener('click', resetGame);

    updateDisplayPlayer();
});

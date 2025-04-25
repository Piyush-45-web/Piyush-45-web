const board = document.getElementById('board');
        const status = document.getElementById('status');
        let cells = [];
        let currentPlayer = 'X';
        let gameActive = true;

        function createBoard() {
            board.innerHTML = '';
            cells = [];
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', () => handleCellClick(i));
                board.appendChild(cell);
                cells.push(cell);
            }
            updateStatus();
        }

        function handleCellClick(index) {
            if (!gameActive || cells[index].textContent) return;
            cells[index].textContent = currentPlayer;
            cells[index].classList.add('taken');

            if (checkWin()) {
                status.textContent = `${currentPlayer} wins!`;
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                status.textContent = "It's a draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }

        function checkWin() {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            return winConditions.some(combination => {
                const [a, b, c] = combination;
                return (
                    cells[a].textContent &&
                    cells[a].textContent === cells[b].textContent &&
                    cells[a].textContent === cells[c].textContent
                );
            });
        }

        function checkDraw() {
            return cells.every(cell => cell.textContent);
        }

        function resetBoard() {
            currentPlayer = 'X';
            gameActive = true;
            createBoard();
        }

        function updateStatus() {
            status.textContent = `Current Player: ${currentPlayer}`;
        }

        createBoard();
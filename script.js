
const puzzleBoard = document.getElementById('puzzleBoard');
const referenceImage = document.getElementById('referenceImage');
const gridSizeSelect = document.getElementById('gridSize');
const imageUpload = document.getElementById('imageUpload');
const startBtn = document.getElementById('startBtn');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const victoryModal = document.getElementById('victoryModal');
const finalMoves = document.getElementById('finalMoves');
const finalTime = document.getElementById('finalTime');
const playAgainBtn = document.getElementById('playAgainBtn');

let gridSize = 4;
let pieces = [];
let emptyIndex = 0;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let currentImage = null;
let gameStarted = false;


const defaultImage = createDefaultImage();

function createDefaultImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(0.25, '#feca57');
    gradient.addColorStop(0.5, '#48dbfb');
    gradient.addColorStop(0.75, '#ff9ff3');
    gradient.addColorStop(1, '#54a0ff');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(300, 150, 80, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(150, 300, 70, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(320, 320, 50, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧩', 200, 200);
    
    return canvas.toDataURL();
}

function initGame() {
    gridSize = parseInt(gridSizeSelect.value);
    moves = 0;
    seconds = 0;
    gameStarted = false;
    
    updateStats();
    clearInterval(timerInterval);
    
    const imageToUse = currentImage || defaultImage;
    
    referenceImage.innerHTML = `<img src="${imageToUse}" alt="Referência">`;
    
    createPuzzle(imageToUse);
}

function createPuzzle(imageSrc) {
    const totalPieces = gridSize * gridSize;
    pieces = Array.from({ length: totalPieces }, (_, i) => i);
    emptyIndex = totalPieces - 1;
    
    shufflePuzzle();
    
    renderBoard(imageSrc);
}

function shufflePuzzle() {
    const shuffleMoves = gridSize * gridSize * 20;
    const totalPieces = gridSize * gridSize;
    
    for (let i = 0; i < shuffleMoves; i++) {
        const neighbors = getValidMoves(emptyIndex);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        [pieces[emptyIndex], pieces[randomNeighbor]] = [pieces[randomNeighbor], pieces[emptyIndex]];
        emptyIndex = randomNeighbor;
    }
    
    emptyIndex = pieces.indexOf(totalPieces - 1);
}

function getValidMoves(emptyIdx) {
    const moves = [];
    const row = Math.floor(emptyIdx / gridSize);
    const col = emptyIdx % gridSize;
    
    if (row > 0) moves.push(emptyIdx - gridSize);
   
    if (row < gridSize - 1) moves.push(emptyIdx + gridSize);
   
    if (col > 0) moves.push(emptyIdx - 1);

    if (col < gridSize - 1) moves.push(emptyIdx + 1);
    
    return moves;
}

function renderBoard(imageSrc) {
    puzzleBoard.innerHTML = '';
    puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    const pieceSize = 400 / gridSize;
    const totalPieces = gridSize * gridSize;
    
    pieces.forEach((pieceValue, index) => {
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.dataset.index = index;
        piece.dataset.value = pieceValue;
        
        if (pieceValue === totalPieces - 1) {
            piece.classList.add('empty');
        } else {
            const originalRow = Math.floor(pieceValue / gridSize);
            const originalCol = pieceValue % gridSize;
            
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
            piece.style.backgroundPosition = `${(originalCol / (gridSize - 1)) * 100}% ${(originalRow / (gridSize - 1)) * 100}%`;
            
            if (pieceValue === index) {
                piece.classList.add('correct');
            }
        }
        
        piece.addEventListener('click', () => movePiece(index));
        
        puzzleBoard.appendChild(piece);
    });
}

function movePiece(clickedIndex) {
    const totalPieces = gridSize * gridSize;
    
    emptyIndex = pieces.indexOf(totalPieces - 1);
    
    const validMoves = getValidMoves(emptyIndex);
    
    if (!validMoves.includes(clickedIndex)) {
        return;
    }
    
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }
    
    [pieces[emptyIndex], pieces[clickedIndex]] = [pieces[clickedIndex], pieces[emptyIndex]];
    
    emptyIndex = clickedIndex;
    
    moves++;
    updateStats();
    
    renderBoard(currentImage || defaultImage);
    
    if (checkVictory()) {
        endGame();
    }
}

function checkVictory() {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i] !== i) {
            return false;
        }
    }
    return true;
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        updateStats();
    }, 1000);
}

function updateStats() {
    movesDisplay.textContent = moves;
    
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
}

function endGame() {
    clearInterval(timerInterval);
    
    finalMoves.textContent = moves;
    finalTime.textContent = timerDisplay.textContent;
    
    victoryModal.classList.remove('hidden');
}

startBtn.addEventListener('click', initGame);

playAgainBtn.addEventListener('click', () => {
    victoryModal.classList.add('hidden');
    initGame();
});

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');
                
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                
                ctx.drawImage(img, sx, sy, size, size, 0, 0, 400, 400);
                currentImage = canvas.toDataURL();
                
                initGame();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('keydown', (e) => {
    if (!gameStarted && pieces.length === 0) return;
    
    let targetIndex = -1;
    
    switch (e.key) {
        case 'ArrowUp':
            if (emptyIndex + gridSize < gridSize * gridSize) {
                targetIndex = emptyIndex + gridSize;
            }
            break;
        case 'ArrowDown':
            if (emptyIndex - gridSize >= 0) {
                targetIndex = emptyIndex - gridSize;
            }
            break;
        case 'ArrowLeft':
            if ((emptyIndex + 1) % gridSize !== 0) {
                targetIndex = emptyIndex + 1;
            }
            break;
        case 'ArrowRight':
            if (emptyIndex % gridSize !== 0) {
                targetIndex = emptyIndex - 1;
            }
            break;
    }
    
    if (targetIndex !== -1) {
        e.preventDefault();
        movePiece(targetIndex);
    }
});

window.addEventListener('load', initGame);

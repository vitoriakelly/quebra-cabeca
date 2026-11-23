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
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const confettiCanvas = document.getElementById('confettiCanvas');
const particlesContainer = document.getElementById('particles');

let gridSize = 4;
let pieces = [];
let emptyIndex = 0;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let currentImage = null;
let gameStarted = false;
let soundEnabled = true;
let isDarkTheme = false;

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    
    initAudio();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch(type) {
        case 'move':
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
            break;
        case 'victory':
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.15 + 0.3);
                osc.start(audioCtx.currentTime + i * 0.15);
                osc.stop(audioCtx.currentTime + i * 0.15 + 0.3);
            });
            break;
        case 'start':
            oscillator.frequency.value = 600;
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.2);
            break;
    }
}

function createParticles() {
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 15 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = Math.random() * 20 + 15 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }
}

const confettiCtx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiAnimationId = null;

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function createConfetti() {
    confettiPieces = [];
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
    
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    animateConfetti();
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    let activeConfetti = false;
    
    confettiPieces.forEach(piece => {
        if (piece.y < confettiCanvas.height + 50) {
            activeConfetti = true;
            
            confettiCtx.save();
            confettiCtx.translate(piece.x, piece.y);
            confettiCtx.rotate(piece.rotation * Math.PI / 180);
            
            confettiCtx.fillStyle = piece.color;
            confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size / 2);
            
            confettiCtx.restore();
            
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;
            piece.speedY += 0.05; 
        }
    });
    
    if (activeConfetti) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : '');
    themeToggle.querySelector('.theme-icon').textContent = isDarkTheme ? '☀️' : '🌙';
    localStorage.setItem('puzzleTheme', isDarkTheme ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('puzzleTheme');
    if (savedTheme === 'dark') {
        isDarkTheme = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }
}

function createDefaultImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#74b9ff');
    gradient.addColorStop(0.5, '#0984e3');
    gradient.addColorStop(1, '#81ecec');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    const circles = [
        { x: 100, y: 100, r: 70, color: 'rgba(255,255,255,0.2)' },
        { x: 320, y: 150, r: 90, color: 'rgba(255,255,255,0.15)' },
        { x: 150, y: 300, r: 80, color: 'rgba(255,255,255,0.2)' },
        { x: 300, y: 320, r: 60, color: 'rgba(255,255,255,0.25)' },
        { x: 200, y: 200, r: 100, color: 'rgba(255,255,255,0.1)' }
    ];
    
    circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
    });
    
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧩', 200, 200);
    
    return canvas.toDataURL();
}

const defaultImage = createDefaultImage();

function initGame() {
    gridSize = parseInt(gridSizeSelect.value);
    moves = 0;
    seconds = 0;
    gameStarted = false;
    
    updateStats();
    clearInterval(timerInterval);
    stopConfetti();
    
    playSound('start');
    
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
    const validMoves = [];
    const row = Math.floor(emptyIdx / gridSize);
    const col = emptyIdx % gridSize;
    
    if (row > 0) validMoves.push(emptyIdx - gridSize);
    if (row < gridSize - 1) validMoves.push(emptyIdx + gridSize);
    if (col > 0) validMoves.push(emptyIdx - 1);
    if (col < gridSize - 1) validMoves.push(emptyIdx + 1);
    
    return validMoves;
}

function renderBoard(imageSrc) {
    puzzleBoard.innerHTML = '';
    puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
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
    
    const clickedPiece = puzzleBoard.children[clickedIndex];
    clickedPiece.classList.add('moving');
    setTimeout(() => clickedPiece.classList.remove('moving'), 200);
    
    playSound('move');
    
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
    
    playSound('victory');
    createConfetti();
    
    setTimeout(() => {
        victoryModal.classList.remove('hidden');
    }, 500);
}

startBtn.addEventListener('click', initGame);

playAgainBtn.addEventListener('click', () => {
    victoryModal.classList.add('hidden');
    stopConfetti();
    initGame();
});

themeToggle.addEventListener('click', toggleTheme);

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.querySelector('.sound-icon').textContent = soundEnabled ? '🔊' : '🔇';
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
    if (pieces.length === 0) return;
    
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

window.addEventListener('resize', resizeConfettiCanvas);

window.addEventListener('load', () => {
    loadTheme();
    createParticles();
    resizeConfettiCanvas();
    initGame();
});

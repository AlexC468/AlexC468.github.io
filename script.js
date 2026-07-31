// Wait for the DOM content to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. EXISTING WEBSITE SURPRISE BUTTON LOGIC ---
  const actionBtn = document.getElementById('action-btn');
  const secretMessage = document.getElementById('secret-message');

  if (actionBtn && secretMessage) {
    actionBtn.addEventListener('click', () => {
      if (secretMessage.classList.contains('hidden')) {
        secretMessage.classList.remove('hidden');
        actionBtn.textContent = 'Hide Message';
      } else {
        secretMessage.classList.add('hidden');
        actionBtn.textContent = 'Click Me for a Surprise!';
      }
    });
  }

  // --- 2. TETRIS MODAL & GAME ENGINE LOGIC ---
  const tetrisBtn = document.getElementById('tetris-btn');
  const tetrisModal = document.getElementById('tetris-modal');
  const closeTetris = document.getElementById('close-tetris');
  const startGameBtn = document.getElementById('start-game-btn');

  const canvas = document.getElementById('tetris');
  const context = canvas.getContext('2d');
  
  // Scale everything up by 20x (10x20 grid = 200x400 pixels canvas area)
  context.scale(20, 20);

  // Official classic Tetromino piece shapes and colors
  const PIECES = {
    'I': [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    'L': [[0,2,0],[0,2,0],[0,2,2]],
    'J': [[0,3,0],[0,3,0],[3,3,0]],
    'O': [[4,4],[4,4]],
    'Z': [[5,5,0],[0,5,5],[0,0,0]],
    'S': [[0,6,6],[6,6,0],[0,0,0]],
    'T': [[0,7,0],[7,7,7],[0,0,0]]
  };

  const COLORS = [
    null,
    '#00f0f0', // 1: Cyan (I)
    '#f0a000', // 2: Orange (L)
    '#0000f0', // 3: Blue (J)
    '#f0f000', // 4: Yellow (O)
    '#f00000', // 5: Red (Z)
    '#00f000', // 6: Green (S)
    '#a000f0'  // 7: Purple (T)
  ];

  // Game state variables
  let arena = createMatrix(12, 20); // Standard 10 columns + 2 boundaries width, 20 height
  let player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
    lines: 0,
    level: 1
  };

  let dropCounter = 0;
  let dropInterval = 1000; // Drops every 1000ms (1 sec) at Level 1
  let lastTime = 0;
  let requestId = null;

  // Create empty 2D array grid
  function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  // Draw matrix (pieces or arena) on the canvas
  function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = COLORS[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
          
          // Add retro grid block outline
          context.strokeStyle = '#000000';
          context.lineWidth = 0.05;
          context.strokeRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  // Main rendering loop
  function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    if (player.matrix) {
      drawMatrix(player.matrix, player.pos);
    }
  }

  // Merge fallen piece into the background arena
  function merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  // Check collision with wall or placed blocks
  function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
           (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  // Clear completed rows and calculate score
  function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y >= 0; --y) {
      for (let x = 0; x < arena[y].length; ++x) {
        if (arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      ++y;

      player.score += rowCount * 100;
      player.lines += 1;
      rowCount *= 2;

      // Increase speed every 10 lines
      player.level = Math.floor(player.lines / 10) + 1;
      dropInterval = Math.max(100, 1000 - (player.level - 1) * 100);
    }
    updateScore();
  }

  // Move piece down automatically over time
  function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      playerReset();
      arenaSweep();
    }
    dropCounter = 0;
  }

  // Instant drop piece to the bottom
  function playerHardDrop() {
    while (!collide(arena, player)) {
      player.pos.y++;
    }
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    dropCounter = 0;
  }

  // Move piece left or right
  function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
      player.pos.x -= dir;
    }
  }

  // Spawn new random piece
  function playerReset() {
    const pieces = 'ILJOTSZ';
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    player.matrix = PIECES[randomPiece];
    player.pos.y = 0;
    player.pos.x = Math.floor(arena[0].length / 2) - Math.floor(player.matrix[0].length / 2);

    // Game Over condition
    if (collide(arena, player)) {
      arena.forEach(row => row.fill(0));
      alert('Game Over! Your Score: ' + player.score);
      player.score = 0;
      player.lines = 0;
      player.level = 1;
      dropInterval = 1000;
      updateScore();
    }
  }

  // Rotate piece matrix
  function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }
    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  // Rotate piece with wall kick correction
  function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
        rotate(player.matrix, -dir);
        player.pos.x = pos;
        return;
      }
    }
  }

  // Update UI scores
  function updateScore() {
    document.getElementById('score').textContent = player.score;
    document.getElementById('lines').textContent = player.lines;
    document.getElementById('level').textContent = player.level;
  }

  // Main Animation Loop
  function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      playerDrop();
    }

    draw();
    requestId = requestAnimationFrame(update);
  }

  // Key Event Listeners for Player Controls
  function handleKeyDown(event) {
    // Only capture controls if the game modal is open
    if (tetrisModal.classList.contains('hidden')) return;

    if (event.keyCode === 37) { // Left arrow
      playerMove(-1);
    } else if (event.keyCode === 39) { // Right arrow
      playerMove(1);
    } else if (event.keyCode === 40) { // Down arrow
      playerDrop();
    } else if (event.keyCode === 38) { // Up arrow (Rotate)
      playerRotate(1);
    } else if (event.keyCode === 32) { // Spacebar (Hard drop)
      event.preventDefault();
      playerHardDrop();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  // Toggle Modal & Start Game
  tetrisBtn.addEventListener('click', () => {
    tetrisModal.classList.remove('hidden');
  });

  closeTetris.addEventListener('click', () => {
    tetrisModal.classList.add('hidden');
    if (requestId) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  });

  startGameBtn.addEventListener('click', () => {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    player.lines = 0;
    player.level = 1;
    updateScore();
    playerReset();
    if (!requestId) {
      update();
    }
  });
});

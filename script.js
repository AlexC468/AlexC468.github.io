/* RESET & BASE STYLES */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f6;
  color: #333333;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* HEADER STYLING */
header {
  background-color: #2c3e50;
  color: #ffffff;
  text-align: center;
  padding: 2.5rem 1rem;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

/* MAIN CONTENT CONTAINER */
main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  text-align: center;
}

.card h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.card p {
  margin-bottom: 1.5rem;
}

/* PRIMARY BUTTON STYLING */
#action-btn {
  background-color: #3498db;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#action-btn:hover {
  background-color: #2980b9;
}

/* FLOATING YELLOW STAR BUTTON */
#tetris-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f1c40f;
  border: 3px solid #f39c12;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, background-color 0.2s ease;
  z-index: 100;
}

#tetris-btn:hover {
  transform: scale(1.15) rotate(15deg);
  background-color: #f39c12;
}

/* TETRIS MODAL POPUP */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a252f;
  color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 90vw;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.close-btn:hover {
  color: #e74c3c;
}

/* GAME CANVAS & BOARD */
.game-container {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

canvas#tetris {
  border: 4px solid #ecf0f1;
  background-color: #000000;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.game-stats {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.1rem;
}

#start-game-btn {
  background-color: #2ecc71;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
}

#start-game-btn:hover {
  background-color: #27ae60;
}

.controls-hint {
  font-size: 0.85rem;
  color: #bdc3c7;
  margin-top: 10px;
  line-height: 1.4;
}

/* UTILITY CLASSES */
.hidden {
  display: none !important;
}

#secret-message {
  margin-top: 1.5rem;
  font-weight: bold;
  color: #27ae60;
}

/* FOOTER STYLING */
footer {
  background-color: #ecf0f1;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

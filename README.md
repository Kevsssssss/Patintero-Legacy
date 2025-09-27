# Patintero Legacy

A digital implementation of the traditional Filipino street game, **Patintero** (also known as *Harangang-Taga* or *Tubig-Tubig*), built using the **Phaser 3** game framework.

## 🔗 Play the Game

The game is deployed and accessible online:

**Deployed Link:** [https://kevsssssss.github.io/Patintero-Legacy/](https://kevsssssss.github.io/Patintero-Legacy/)

---

## 🎯 Game Objective

The goal is for the two players (the runners) to successfully cross the entire playing court (from the starting line to the end line) and cross back to the starting line without being tagged by any of the Bots (the "It" team).

* **Scoring:** 10 points are awarded each time a player completes the round-trip journey (crosses to the end and returns to the start).
* **Being Tagged:** If a player is tagged by a Bot, they are immediately sent back to their starting position, and their current "crossed" status (checkpoint) is cancelled. Each player starts with 5 lives.
* **Game Over:** The game ends if either Player 1 or Player 2 runs out of lives.

---

## 🎮 Controls

This is a two-player local co-op game.

| Player | Movement | Keys |
| :--- | :--- | :--- |
| **Player 1** | Move Up/Down/Left/Right | **W, S, A, D** |
| **Player 2** | Move Up/Down/Left/Right | **Arrow Keys (↑, ↓, ←, →)** |

---

## ⚙️ Project Setup

### Prerequisites

You need to have **Node.js** installed on your system to run this project.

### 🚀 Running the Game Locally

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Kevsssssss/Patintero-Legacy.git
    cd Patintero-Legacy
    ```

2.  **Install Dependencies:**
    Use `npm` to install all necessary packages, including Phaser and development tools.
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    Run the development script. This command bundles the game and starts a local web server, usually opening a browser tab automatically.
    ```bash
    npm run dev
    ```

    The game will typically be accessible at `http://localhost:8080` (or a similar address if port 8080 is already in use).

---

## 💻 Tech Stack

* **Game Framework:** [Phaser 3](https://phaser.io/) - A fast, free, and fun open-source framework for Canvas and WebGL powered browser games.
* **Language:** JavaScript (ES6+)

---

## 📄 Core Game Mechanics

The main logic is contained within the `PlayGrounds.js` scene.

* **Countdown:** A **3, 2, 1, GO!** countdown is implemented at the start of the game, during which player and bot movement is disabled.
* **Player Movement:** Players use normalized velocity to ensure movement speed remains consistent even when traveling diagonally.
* **Bot AI:**
    * **Vertical Bots:** Bots on the inner vertical lines track the nearest player and move up and down along their assigned lane.
    * **Horizontal Bot:** The center bot (`this.bot3`) tracks the nearest player horizontally along the midline.
* **Scoring System:** Uses checkpoint logic (`playerXCrossed`) to ensure a player must reach the far right line before they can score by returning to the far left.

### 🛑 Game Over State (New Updates)

The Game Over state includes crucial changes to ensure a clean transition and provide immediate gameplay options:

* **Animation Freeze:** Upon game over, all player and bot animations are immediately stopped, and their sprites are set to their static idle frame (frame 0).
* **Audio Transition:** The ambient `gamePlayMusic` stops, and a dedicated `gameOver` audio track plays.
* **Game Over Menu:** The screen displays the Final Score and presents two options with interactive hover effects:
    * **RETRY:** Restarts the current `PlayGrounds` scene, beginning a new game.
    * **MAIN MENU:** Transitions back to the `MainMenu` scene.
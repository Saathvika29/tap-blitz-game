const target = document.getElementById("target");

const scoreText = document.getElementById("score");

const timeText = document.getElementById("time");

const startBtn = document.getElementById("startBtn");

const bestScoreText = document.getElementById("bestScore");

let score = 0;

let timeLeft = 30;

let gameInterval;

function moveTarget() {

  const gameArea = document.getElementById("gameArea");

  const maxX = gameArea.clientWidth - 60;

  const maxY = gameArea.clientHeight - 60;

  const randomX = Math.floor(Math.random() * maxX);

  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;

  target.style.top = `${randomY}px`;
}

bestScoreText.innerText =
  localStorage.getItem("bestScore") || 0;

startBtn.addEventListener("click", () => {

  score = 0;

  timeLeft = 30;

  scoreText.innerText = score;

  timeText.innerText = timeLeft;

  target.style.display = "block";

  moveTarget();

  clearInterval(gameInterval);

  gameInterval = setInterval(() => {

    timeLeft--;

    timeText.innerText = timeLeft;

    if (timeLeft <= 0) {

      clearInterval(gameInterval);

      target.style.display = "none";

      const playerName = prompt("Enter your name");

      fetch("http://127.0.0.1:3000/save-score", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: playerName,
          score: score
        })

      })
      .then((res) => res.json())
      .then((data) => {

        alert("Score Saved!");

      });

    }

  }, 1000);

});

target.addEventListener("click", () => {

  score++;

  scoreText.innerText = score;

  const bestScore =
    localStorage.getItem("bestScore") || 0;

  if (score > bestScore) {

    localStorage.setItem("bestScore", score);

    bestScoreText.innerText = score;

  }

  moveTarget();

});

function loadLeaderboard() {

  fetch("http://127.0.0.1:3000/leaderboard")

    .then((res) => res.json())

    .then((data) => {

      const leaderboard =
        document.getElementById("leaderboard");

      leaderboard.innerHTML = "";

      data.forEach((player) => {

        const li = document.createElement("li");

        li.innerText =
          `${player.name} - ${player.score}`;

        leaderboard.appendChild(li);

      });

    });

}

loadLeaderboard();
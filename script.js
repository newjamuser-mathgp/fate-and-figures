// Questions Data
const questions = [
  {
    level: 1,
    title: "Statistics Challenge",
    question: "A group of grade 7 students recorded the number of books they read in one month: 6, 8, 10, 8, 12, 4, 8. What is the MEAN of the data?",
    options: ["6", "7", "8", "9"],
    answer: 2,
    explanation: "Mean = (6+8+10+8+12+4+8)/7 = 8"
  },
  {
    level: 2,
    title: "Music Survey Challenge",
    question: "In a class of 40 students: 19 liked dancehall. The number who liked reggae was twice the number who liked soca. How many liked soca?",
    options: ["5", "7", "10", "12"],
    answer: 1,
    explanation: "Let soca = x, reggae = 2x. 40-19=21, so x+2x=21, x=7."
  },
  {
    level: 3,
    title: "Marble Mystery Challenge",
    question: "A bag contains red, blue, and green marbles. 12 red marbles represent 1/3 of the total. The probability of picking a blue marble is 1/2. How many green marbles are in the bag?",
    options: ["4", "6", "8", "12"],
    answer: 1,
    explanation: "Total=36, blue=18, green=6."
  },
  {
    level: 4,
    title: "Token Draw Challenge",
    question: "A box contains 5 red, 3 blue, 4 green tokens. Two tokens are drawn without replacement. Which is more likely?",
    options: [
      "Both tokens are red",
      "One blue and one green",
      "Both tokens are the same color",
      "All outcomes are equally likely"
    ],
    answer: 1,
    explanation: "One blue and one green is more likely (2/11 > 5/33)."
  },
  {
    level: 5,
    title: "Cumulative Frequency Challenge",
    question: "A group of 40 students received marks (out of 60): 0–10:3, 10–20:5, 20–30:8, 30–40:12, 40–50:7, 50–60:5. Where is the median?",
    options: ["💙", "💚", "💛"],
    answer: 1,
    explanation: "Median is in 30–40 class, ≈33.3 marks."
  }
];

// Game Variables
let current = 0;
let startTime;
let timerInterval;

// Show Question
function showQuestion() {
  const q = questions[current];

  document.getElementById('screen').innerHTML = `
    <h2>Level ${q.level}: ${q.title}</h2>
    <p>${q.question}</p>
    <div>
      ${q.options.map((opt, i) =>
        `<button onclick="checkAnswer(${i})">${opt}</button>`
      ).join('')}
    </div>
    <div id="feedback"></div>
  `;
}

// Check Answer
function checkAnswer(selected) {
  const q = questions[current];
  const feedback = document.getElementById('feedback');

  if (selected === q.answer) {
    feedback.innerHTML = `<span style="color:lightgreen;">Correct! ${q.explanation}</span>`;

    setTimeout(() => {
      current++;
      if (current < questions.length) {
        showQuestion();
      } else {
        endGame();
      }
    }, 1500);

  } else {
    feedback.innerHTML = `<span style="color:red;">Try Again!</span>`;
  }
}

// Start Game
function startGame() {
  current = 0;
  showQuestion();

  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);

  document.getElementById('start-btn').style.display = 'none';
}

// Update Timer
function updateTimer() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  document.getElementById('timer').textContent = `Time: ${elapsed}s`;
}

// End Game
function endGame() {
  clearInterval(timerInterval);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  document.getElementById('screen').innerHTML = `
    <h2>🎉 Congratulations!</h2>
    <p>You completed all levels in ${elapsed} seconds!</p>
    <button onclick="startGame()">Play Again</button>
  `;

  document.getElementById('start-btn').style.display = 'block';
}

// ✅ FIX: Ensure button works after page loads
window.onload = function() {
  document.getElementById('start-btn').onclick = startGame;
};
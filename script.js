let questions = [];
let currentQuestion = 0;
let timeLeft = 360;
let interval;

const startBtn = document.getElementById('startBtn');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const questionEl = document.getElementById('question');
const answersEl = document.querySelectorAll('.answer');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');

function startGame() {
  questions = shuffle([...questionBank]);
  currentQuestion = 0;
  timeLeft = 360;
  menu.classList.add('hidden');
  game.classList.remove('hidden');
  interval = setInterval(updateTimer, 1000);
  showQuestion();
}

function updateTimer() {
  timeLeft--;
  let minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  let seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerEl.textContent = `Tiempo restante: ${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(interval);
    showResult("¡Tiempo agotado!");
  }
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    clearInterval(interval);
    showResult("¡Juego terminado!");
    return;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.forEach(btn => {
    const letter = btn.dataset.letter;
    btn.textContent = q.answers[letter];
    btn.onclick = () => checkAnswer(letter);
  });
}

function checkAnswer(letter) {
  const correct = questions[currentQuestion].correct;
  if (letter === correct) {
    resultEl.textContent = "¡Correcto!";
  } else {
    resultEl.textContent = `Incorrecto. Respuesta correcta: ${correct}`;
  }
  currentQuestion++;
  setTimeout(() => {
    resultEl.textContent = "";
    showQuestion();
  }, 1000);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

startBtn.addEventListener('click', startGame);
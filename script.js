const totalTime = 6 * 60; // 6 minutos en segundos
let currentIndex = 0;
let score = 0;
let timer;
let questions = [];

// Mezcla un array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Obtiene preguntas aleatorias sin repetir
function getRandomQuestions() {
  const shuffled = [...questionBank];
  shuffleArray(shuffled);
  return shuffled.slice(0, 100);
}

function loadQuestion() {
  if (currentIndex >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentIndex];
  document.getElementById("question").innerText = q.question;

  for (const key in q.answers) {
    const btn = document.getElementById("btn-" + key);
    btn.innerText = q.answers[key];
    btn.disabled = false;
    btn.onclick = () => selectAnswer(key, q.correct);
  }
}

function selectAnswer(selected, correct) {
  for (const key of ['A','B','C','D']) {
    document.getElementById("btn-" + key).disabled = true;
  }

  if (selected === correct) {
    score++;
    document.getElementById("feedback").innerText = "✅ ¡Correcto!";
  } else {
    document.getElementById("feedback").innerText = `❌ Incorrecto. La respuesta correcta era ${correct}`;
  }

  currentIndex++;
  setTimeout(() => {
    document.getElementById("feedback").innerText = "";
    loadQuestion();
  }, 1200);
}

function startGame() {
  questions = getRandomQuestions();
  currentIndex = 0;
  score = 0;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  loadQuestion();

  let timeLeft = totalTime;
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);

  document.getElementById("game-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("final-score").innerText = `Puntuación final: ${score}`;
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", () => {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
});
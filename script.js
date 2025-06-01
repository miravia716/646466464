
const totalTime = 6 * 60; // 6 minutos
let currentIndex = 0;
let score = 0;
let timer;
let questions = [];
let usedIndices = new Set();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Mezcla profunda y variación de temas
function getRandomQuestions() {
  const topicBuckets = {};
  questionBank.forEach(q => {
    const topic = q.topic || "general";
    if (!topicBuckets[topic]) topicBuckets[topic] = [];
    topicBuckets[topic].push(q);
  });

  const mixed = [];
  const topics = Object.keys(topicBuckets);
  shuffleArray(topics);

  while (mixed.length < 100 && topics.length > 0) {
    topics.forEach(topic => {
      const arr = topicBuckets[topic];
      if (arr.length > 0) {
        const randIndex = Math.floor(Math.random() * arr.length);
        mixed.push(arr.splice(randIndex, 1)[0]);
      }
    });
  }

  return mixed;
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
    btn.onclick = () => selectAnswer(key, q.correct);
  }
}

function selectAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    document.getElementById("feedback").innerText = "✅ ¡Correcto!";
  } else {
    document.getElementById("feedback").innerText = `❌ Incorrecto. Respuesta correcta: ${correct}`;
  }
  currentIndex++;
  setTimeout(() => {
    document.getElementById("feedback").innerText = "";
    loadQuestion();
  }, 1000);
}

function startGame() {
  questions = getRandomQuestions();
  currentIndex = 0;
  score = 0;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  loadQuestion();

  let timeLeft = totalTime;
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

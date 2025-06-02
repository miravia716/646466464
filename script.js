document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let timeLeft = 360; // 6 minutos
  let timerInterval;

  const startBtn = document.getElementById('startBtn');
  const menu = document.getElementById('menu');
  const game = document.getElementById('game');
  const timerDisplay = document.getElementById('timer');
  const questionEl = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const resultEl = document.getElementById('result');

  startBtn.addEventListener('click', () => {
    startGame();
  });

  for (const btn of answersContainer.children) {
    btn.addEventListener('click', selectAnswer);
  }

  function startGame() {
    menu.classList.add('hidden');
    game.classList.remove('hidden');
    currentQuestionIndex = 0;
    timeLeft = 360;
    resultEl.textContent = '';
    showQuestion();
    startTimer();
  }

  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
      updateTimerDisplay();
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `Tiempo restante: ${minutes}:${seconds}`;
  }

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    for (const btn of answersContainer.children) {
      const letter = btn.getAttribute('data-letter');
      btn.textContent = `${letter}: ${currentQuestion.answers[letter]}`;
      btn.disabled = false;
      btn.classList.remove('correct', 'wrong');
    }
    resultEl.textContent = '';
  }

  function selectAnswer(e) {
    const selectedLetter = e.target.getAttribute('data-letter');
    const currentQuestion = questions[currentQuestionIndex];

    for (const btn of answersContainer.children) {
      btn.disabled = true;
    }

    if (selectedLetter === currentQuestion.correct) {
      resultEl.textContent = '¡Correcto!';
      e.target.classList.add('correct');
    } else {
      resultEl.textContent = `Incorrecto. La respuesta correcta era: ${currentQuestion.correct}`;
      e.target.classList.add('wrong');
      for (const btn of answersContainer.children) {
        if (btn.getAttribute('data-letter') === currentQuestion.correct) {
          btn.classList.add('correct');
        }
      }
    }

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endGame();
      }
    }, 1500);
  }

  function endGame() {
    clearInterval(timerInterval);
    game.classList.add('hidden');
    menu.classList.remove('hidden');
    alert('El juego ha terminado. ¡Gracias por jugar!');
  }
});

const questions = [
  {
    question: "¿Dónde fue nuestra primera cita?",
    answers: [
      "En un restaurante",
      "En el cine",
      "Dando un paseo",
      "Tomando algo"
    ],
    correct: 0,
    hint: "Piénsalo bien... fue un plan muy nuestro."
  },
  {
    question: "¿Cuál de estos planes me gusta más contigo?",
    answers: [
      "Ir de compras",
      "Una noche tranquila juntos",
      "Salir de fiesta hasta tarde",
      "Ir a correr"
    ],
    correct: 1,
    hint: "No hace falta mucho para que un plan sea perfecto."
  },
  {
    question: "¿Qué es lo que más me gusta de ti?",
    answers: [
      "Tu forma de mirarme",
      "Tu risa",
      "Cómo me cuidas",
      "Todas las anteriores"
    ],
    correct: 3,
    hint: "Esta era fácil, tramposilla."
  },
  {
    question: "¿Qué premio desbloqueas si ganas?",
    answers: [
      "Un abrazo",
      "Una cena",
      "Una sorpresa",
      "Todo lo anterior"
    ],
    correct: 3,
    hint: "Conmigo nunca hay solo un premio."
  }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const finalScreen = document.getElementById("final-screen");

const questionCounter = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");
const questionTitle = document.getElementById("question-title");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const finalMessage = document.getElementById("final-message");

function startGame() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];

  questionCounter.textContent = `Pregunta ${currentQuestion + 1}/${questions.length}`;
  scoreElement.textContent = `❤️ ${score}`;
  questionTitle.textContent = question.question;
  feedback.textContent = "";
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.onclick = () => checkAnswer(index);
    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestion];

  if (selectedIndex === question.correct) {
    score++;
    feedback.textContent = "Correcto 💖";
    scoreElement.textContent = `❤️ ${score}`;

    setTimeout(() => {
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showFinal();
      }
    }, 800);
  } else {
    feedback.textContent = `Casi... pista: ${question.hint}`;
  }
}

function showFinal() {
  quizScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  finalMessage.textContent =
    `Has conseguido ${score} de ${questions.length} corazones.
    Da igual la puntuación, porque mi parte favorita de esta historia eres tú.
    Feliz aniversario, mi amor ❤️`;
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  finalScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
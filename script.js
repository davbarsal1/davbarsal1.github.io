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
    hint: "Un restaurante donde puedes plantar un..."
  },
  {
    question: "¿Cuál es mi comida favorita?",
    answers: [
      "Sushi",
      "Hojaldre de queso",
      "Hamburguesa",
      "Lentejas"
    ],
    correct: 0,
    hint: "Susuki, Fujitsu, Doraemon... dale una vuelta."
  },
  {
    question: "De los tres bancos que hay en San Bernardo, ¿en cuál nos sentamos en nuestra primera cita?",
    answers: [
      "El primero",
      "El segundo",
      "El tercero"
    ],
    correct: 1,
    hint: "1 + 1"
  },
  {
    question: "¿Quién es más guapo de nosotros?",
    answers: [
      "Tú",
      "Yo",
      "Los dosh somosh guaposh"
    ],
    correct: 2,
    hint: "¿En serio has dicho uno de nosotros?"
  },
  {
    question: "Di un destino al que te gustaría ir",
    answers: [
      "Londres - Harry Potter tour",
      "Skopelos - Mamma Mia tour",
      "Asturias y Galicia - Ovejas tour",
      "París - Disney tour"
    ],
    correct: 1,
    hint: "¿Traicionas a Donna? Qué feo."
  },
  {
    question: "¿Has dicho Skopelos?",
    answers: [
      "Sí"
    ],
    correct: 0,
    hint: ""
  }
];

const apartmentPhotos = [
  "apartamento1.jpg",
  "apartamento2.jpg",
  "apartamento3.jpg"
];

let currentQuestion = 0;
let score = 0;
let photoIndex = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const searchScreen = document.getElementById("search-screen");
const revealScreen = document.getElementById("reveal-screen");
const finalScreen = document.getElementById("final-screen");

const questionCounter = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");
const questionTitle = document.getElementById("question-title");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const apartmentPhoto = document.getElementById("apartment-photo");
const loadingBar = document.getElementById("loading-bar");
const loadingText = document.getElementById("loading-text");
const loveSong = document.getElementById("love-song");

function startGame() {
  currentQuestion = 0;
  score = 0;
  photoIndex = 0;

  startScreen.classList.add("hidden");
  finalScreen.classList.add("hidden");
  revealScreen.classList.add("hidden");
  searchScreen.classList.add("hidden");

  quizScreen.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];

  questionCounter.textContent = `Pregunta ${currentQuestion + 1}/7`;
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
    scoreElement.textContent = `❤️ ${score}`;
    feedback.textContent = "Correcto ❤️";

    disableAnswerButtons();

    setTimeout(() => {
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showSearchScreen();
      }
    }, 800);
  } else {
    if (question.hint) {
      feedback.textContent = `Casi... pista: ${question.hint}`;
    } else {
      feedback.textContent = "No hay escapatoria posible en esta pregunta.";
    }
  }
}

function disableAnswerButtons() {
  const buttons = answersContainer.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function showSearchScreen() {
  quizScreen.classList.add("hidden");
  searchScreen.classList.remove("hidden");

  let progress = 0;

  loadingBar.style.width = "0%";
  loadingText.textContent = "Buscando sorpresa...";
  apartmentPhoto.src = apartmentPhotos[0];

  const loadingMessages = [
    "Buscando sorpresa...",
    "Revisando vuelos imaginarios...",
    "Mirando algo en Grecia...",
    "Preguntándole a Donna...",
    "Encontrando apartamento...",
    "Preparando momentazo..."
  ];

  const interval = setInterval(() => {
    progress += 4;
    loadingBar.style.width = `${progress}%`;

    const messageIndex = Math.min(
      Math.floor(progress / 18),
      loadingMessages.length - 1
    );

    loadingText.textContent = loadingMessages[messageIndex];

    if (progress % 24 === 0) {
      changeApartmentPhoto();
    }

    if (progress >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        searchScreen.classList.add("hidden");
        revealScreen.classList.remove("hidden");
      }, 700);
    }
  }, 220);
}

function changeApartmentPhoto() {
  photoIndex++;

  if (photoIndex >= apartmentPhotos.length) {
    photoIndex = 0;
  }

  apartmentPhoto.src = apartmentPhotos[photoIndex];
}

function acceptTrip() {
  revealScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  loveSong.currentTime = 0;

  loveSong.play().catch(() => {
    console.log("El navegador ha bloqueado la reproducción automática.");
  });

  launchHearts();
}

function launchHearts() {
  for (let i = 0; i < 34; i++) {
    const heart = document.createElement("div");

    heart.textContent = getRandomHeart();
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = "100%";
    heart.style.fontSize = `${18 + Math.random() * 24}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "999";
    heart.style.animation = `floatHeart ${3 + Math.random() * 2}s ease forwards`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5200);
  }
}

function getRandomHeart() {
  const hearts = ["❤️", "💖", "💕", "💘", "🇬🇷", "🌊"];

  return hearts[Math.floor(Math.random() * hearts.length)];
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  photoIndex = 0;

  loveSong.pause();
  loveSong.currentTime = 0;

  loadingBar.style.width = "0%";
  apartmentPhoto.src = apartmentPhotos[0];

  finalScreen.classList.add("hidden");
  revealScreen.classList.add("hidden");
  searchScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");

  startScreen.classList.remove("hidden");
}

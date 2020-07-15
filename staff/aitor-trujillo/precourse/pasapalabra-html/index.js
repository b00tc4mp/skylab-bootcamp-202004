// VARS & DOM

var questions = [
  {
    letter: "a",
    answer: "amor",
    status: 0,
    announce: "CON LA A",
    question: "Sentimiento de locura temporal curable con el matrimonio."
  },
  {
    letter: "b",
    answer: "bohemio",
    status: 0,
    announce: "CON LA B",
    question:
      "Persona rara con pantalones cagados interesada en todo tipo de arte."
  },
  {
    letter: "c",
    answer: "cafe",
    status: 0,
    announce: "CON LA C",
    question: "Bebida que convierte zombis en humanos por la mañana."
  },
  {
    letter: "d",
    answer: "dentista",
    status: 0,
    announce: "CON LA D",
    question:
      "Igual que tus padres, pero el critica tus dientes en vez de tu estilo de vida."
  },
  {
    letter: "e",
    answer: "ebrio",
    status: 0,
    announce: "CON LA E",
    question: "Estado en el que caminas regular y le hablas a las farolas."
  },
  {
    letter: "f",
    answer: "farol",
    status: 0,
    announce: "CON LA F",
    question: "Lo que te marcas cuando tienes una pareja de treses."
  },
  {
    letter: "g",
    answer: "gintonic",
    status: 0,
    announce: "CON LA G",
    question: "El cubata de los pijos."
  },
  {
    letter: "h",
    answer: "hospital",
    status: 0,
    announce: "CON LA H",
    question:
      "Sitio donde despiertas justo después de decir 'Aguantame la cerveza y mira esto...'"
  },
  {
    letter: "i",
    answer: "instagram",
    status: 0,
    announce: "CON LA I",
    question: "La droga en forma de app más consumida."
  },
  {
    letter: "j",
    answer: "junior",
    status: 0,
    announce: "CON LA J",
    question: "Developers de Skylab sin experiencia."
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    announce: "CON LA K",
    question:
      "Palabra japonesa que define al paracaidista que salta antes de decir 3."
  },
  {
    letter: "l",
    answer: "lavabo",
    status: 0,
    announce: "CON LA L",
    question: "Lugar donde está el trono de la casa."
  },
  {
    letter: "m",
    answer: "mañana",
    status: 0,
    announce: "CON LA M",
    question: "El mejor momento para hacer lo que tienes programado para hoy."
  },
  {
    letter: "n",
    answer: "netflix",
    status: 0,
    announce: "CON LA N",
    question: "Donde ves una peli si no tienes dinero para ir al cine."
  },
  {
    letter: "ñ",
    answer: "niño",
    status: 0,
    announce: "CONTIENE LA Ñ",
    question: "Mini-humano que hace ruido porque sí y ensucia todo lo que toca."
  },
  {
    letter: "o",
    answer: "optimista",
    status: 0,
    announce: "CON LA O",
    question: "Un futuro pesimista, pero aun sin experiencia."
  },
  {
    letter: "p",
    answer: "programador",
    status: 0,
    announce: "CON LA P",
    question: "Organismo que convierte cafeína en código."
  },
  {
    letter: "q",
    answer: "quijote",
    status: 0,
    announce: "CON LA Q",
    question: "En un lugar de la Mancha cuyo nombre no quiero acordarme..."
  },
  {
    letter: "r",
    answer: "reggaeton",
    status: 0,
    announce: "CON LA R",
    question:
      "Conjunto de ruidos que te hacen mover el culo. (Algunos dicen que es música)"
  },
  {
    letter: "s",
    answer: "secreto",
    status: 0,
    announce: "CON LA S",
    question: "Lo que le dices a todo el mundo que no se lo explique a nadie."
  },
  {
    letter: "t",
    answer: "true",
    status: 0,
    announce: "CON LA T",
    question: "{!false}"
  },
  {
    letter: "u",
    answer: "uranio",
    status: 0,
    announce: "CON LA U",
    question: "Material radioactivo que hace que tú cargues el movil."
  },
  {
    letter: "v",
    answer: "vegetariano",
    status: 0,
    announce: "CON LA V",
    question: "En la prehistoria se llamaba 'Mal cazador'"
  },
  {
    letter: "w",
    answer: "wasabi",
    status: 0,
    announce: "CON LA W",
    question:
      "Lo que te das cuenta tarde que no es crema de pistacho en el japo."
  },
  {
    letter: "x",
    answer: "experiencia",
    status: 0,
    announce: "CONTIENE LA X",
    question:
      "La necesito para tener un trabajo, pero no tengo porque necesito un trabajo para tenerla."
  },
  {
    //
    letter: "y",
    answer: "york",
    status: 0,
    announce: "CON LA Y",
    question: "Embutido que tiene una ciudad nueva en Manhattan."
  },
  {
    letter: "z",
    answer: "zombie",
    status: 0,
    announce: "CON LA Z",
    question: "Ex-humano que quiere comerte la cabeza."
  }
];

var rankingPlayers = [
  {
    name: "Gandalf",
    points: 26
  },
  {
    name: "Arya Stark",
    points: 19
  },
  {
    name: "Forrest Gump",
    points: 2
  }
];

var rankingContainer = document.querySelector("#ranking-players-container");

var lettersCount = 0;
var nextLetter = 0;
var points = 0;
var username = "Player1";
var myTimer;

var timer = document.querySelector(".timer");
var bigBall = document.querySelector(".start-game");
var pasapalabraBtn = document.getElementById("pasapalabra-btn");
var questionDisplay = document.querySelector("#question-display");
var playerAnswer = document.querySelector("#player-answer");
var roscoCircles = document.querySelectorAll("#letters-container button");
var pointsDisplay = document.querySelector(".points-display");
var endAnnounceContainer = document.querySelector(".end-announce-container");
var endGameAnnounce = document.querySelector(".end-game");
var endTimeAnnounce = document.querySelector(".end-time");
var rankingContainer = document.querySelector("#ranking-players-container");

// NAV MANAGEMENT

var rulesPage = document.querySelector("#rules-page");
var gamePage = document.querySelector("#game-page");
var rankingPage = document.querySelector("#ranking-page");

function rulesClick() {
  rulesPage.style.display = "flex";
  gamePage.style.display = "none";
  rankingPage.style.display = "none";
  resetGame();
}
function gameClick() {
  rulesPage.style.display = "none";
  rankingPage.style.display = "none";
  gamePage.style.display = "block";
  resetGame();
  bigBall.innerHTML = "START";
  bigBall.disabled = false;
}
function rankingClick() {
  rulesPage.style.display = "none";
  gamePage.style.display = "none";
  rankingPage.style.display = "block";
  addPlayersToRanking();
  resetGame();
}

// darkMode

var body = document.querySelector("body");
var darkMode = false;

function toTheDarkSide() {
  body.classList.toggle("dark");
}

// PLAYING GAME STUFF

function start() {
  pasapalabraBtn.disabled = false;
  bigBall.disabled = true;
  resetGame();

  // timer
  myTimer = setInterval(function() {
    var seconds = Number(timer.innerHTML);
    seconds--;
    timer.innerHTML = seconds.toString();

    if (seconds <= 0) {
      clearInterval(myTimer);
      forceEndGame();
    } else if (lettersCount == questions.length) {
      clearInterval(myTimer);
    }
  }, 1000);

  showDefinition();
}

function showDefinition() {
  if (nextLetter == 27) {
    nextLetter = 0;
    nextLetter = checkStatus();
  } else {
    nextLetter = checkStatus();
  }
  bigBall.innerHTML = questions[nextLetter].announce.toUpperCase();
  questionDisplay.innerHTML = questions[nextLetter].question;
  nextLetter++;
}

function checkStatus() {
  for (var i = nextLetter; i < questions.length; i++) {
    if (questions[i].status == 0) {
      return i;
    }
  }
  if (lettersCount < questions.length) {
    nextLetter = 0;
    return checkStatus();
  }
  checkEndGame();
}

function checkAnswer() {
  answer = playerAnswer.value.toLowerCase();
  playerAnswer.value = "";
  if (questions[nextLetter - 1].answer == answer) {
    questions[nextLetter - 1].status = 1;
    paintRosco();
    points++;
    lettersCount++;
    showDefinition();
  } else if (questions[nextLetter - 1].answer != answer) {
    questions[nextLetter - 1].status = 2;
    paintRosco();
    lettersCount++;
    showDefinition();
  }
}

function paintRosco() {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].status == 1) {
      roscoCircles[i].classList.add("correct-answer");
    } else if (questions[i].status == 2) {
      roscoCircles[i].classList.add("wrong-answer");
    }
  }
}

// END GAME STUFF

function checkEndGame() {
  pointsDisplay.innerHTML = points;
  endTimeAnnounce.style.display = "none";
  endAnnounceContainer.style.display = "block";
  bigBall.innerHTML = "VOLVER A JUGAR?";
  bigBall.disabled = false;
  pasapalabraBtn.disabled = true;
  playerToRanking();
  rankingSort();
  addPlayersToRanking();
}

function forceEndGame() {
  pointsDisplay.innerHTML = points;
  endGameAnnounce.style.display = "none";
  endAnnounceContainer.style.display = "block";
  playerToRanking();
  rankingSort();
  addPlayersToRanking();
  bigBall.innerHTML = "VOLVER A JUGAR?";
  bigBall.disabled = false;
  pasapalabraBtn.disabled = true;
}

function resetGame() {
  timer.innerHTML = "120";

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].status == 1) {
      roscoCircles[i].classList.remove("correct-answer");
    } else if (questions[i].status == 2) {
      roscoCircles[i].classList.remove("wrong-answer");
    }
    questions[i].status = 0;
  }

  lettersCount = 0;
  nextLetter = 0;
  points = 0;
  username = "Player1";
  clearInterval(myTimer);
  endAnnounceContainer.style.display = "none";
  endTimeAnnounce.style.display = "block";
  endGameAnnounce.style.display = "block";
  questionDisplay.innerHTML =
    "¡Pulsa START cuando estés listo para empezar a jugar!";
}

// RANKING STUFF

// 1. Crear Player y push a rankingPlayers
// 2. Hacer sort() a rankingPlayers
// 3. Crear ranking table en HTML

function playerToRanking() {
  username = prompt("Introduce tu nombre de Jugador");
  rankingPlayers.push({
    name: username,
    points: points
  });
}

function rankingSort() {
  rankingPlayers.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    } else {
      return 1;
    }
  });
}

function addPlayersToRanking() {
  rankingContainer.innerHTML = "";
  if (!darkMode) {
    for (var i = 0; i < rankingPlayers.length; i++) {
      rankingContainer.innerHTML += `<div class="ranked-player-container white-mode"><div class="ranked-player"><span>${i +
        1}.</span>${rankingPlayers[i].name}<span>${
        rankingPlayers[i].points
      }</span></div></div>`;
    }
  } else {
    for (var i = 0; i < rankingPlayers.length; i++) {
      rankingContainer.innerHTML += `<div class="ranked-player-container dark-mode"><div class="ranked-player"><span>${i +
        1}.</span>${rankingPlayers[i].name}<span>${
        rankingPlayers[i].points
      }</span></div></div>`;
    }
  }
}

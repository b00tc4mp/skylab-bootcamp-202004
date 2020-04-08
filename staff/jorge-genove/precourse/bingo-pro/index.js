var randomNumber;
function randomNum(min, max) {
  randomNumber = Math.floor(Math.random() * (max - min)) + min;
}
var checkPoint = false;
var counter = 100;
var cartonFake = [];
var carton = [];
var randomNumberCheck = [];
var user;
var cartonControl = [100];
var lineaCheck = false;
var controlName = false;
var stop = false;
function impCarton() {
  for (var i = 0; i < carton.length; i++) {
    console.log(carton[i].join(" "));
  }
}
var llave = false;
var createCarton = function createCarton() {
  while (cartonFake.length < 15) {
    randomNum(1, 100);

    if (cartonFake.includes(randomNumber)) {
      cartonControl.push(randomNumber);
    } else {
      cartonFake.push(randomNumber);
    }
  }
  carton[0] = cartonFake.slice(0, 5);
  carton[1] = cartonFake.slice(5, 10);
  carton[2] = cartonFake.slice(10, 16);
  impCarton();
  randomNumber = 0;
  setTimeout(cartonOk, 1000);
};
var cartonOk = function cartonOk() {
  if (confirm(`${user}¿Quieres este carton?`)) {
    setTimeout(askTurn, 3000);
  } else {
    carton = [];
    cartonFake = [];
    cartonControl = [100];
    createCarton();
  }
};

function newTurn() {
  randomNum(1, 100);
  if (randomNumberCheck.includes(randomNumber)) {
    newTurn();
  } else {
    console.log(randomNumber);
    for (let i = 0; i < carton.length; i++) {
      for (let j = 0; j < carton[i].length; j++) {
        if (randomNumber === carton[i][j]) {
          carton[i][j] = "X";
          impCarton();
          if (
            (carton[0].every(linea) ||
              carton[1].every(linea) ||
              carton[2].every(linea)) &&
            lineaCheck === false
          ) {
            alert(`${user} ha cantado LINEA`);
            lineaCheck = true;
          }
        }
      }
    }
    counter = counter - 1;
    setTimeout(askTurn, 1000);
  }
}
const linea = currentValue => typeof currentValue === "string";
const askTurn = function askTurn() {
  if (
    carton[0].every(linea) &&
    carton[1].every(linea) &&
    carton[2].every(linea)
  ) {
    alert(`${user} ha cantado BINGO!!su puntuacion es ${counter}`);
    stop = true;
    var rankingProFinal = [];
    var ranking = {
      user: `${user}`,
      puntuacion: `${counter}`
    };
    rankingProFinal.push(ranking);

    if (localStorage.getItem("ranking")) {
      var rankingProFinal = rankingProFinal.concat(
        JSON.parse(localStorage.getItem("ranking"))
      );
    }
    localStorage.setItem("ranking", JSON.stringify(rankingProFinal));

    rankingProFinal.sort(function(a, b) {
      return b.puntuacion - a.puntuacion;
    });
    console.log(rankingProFinal);
    if (confirm("Quieres volver a jugar?")) {
      bingo();
    } else {
      alert("nos vemos pronto");
    }
  }

  if (stop === false && confirm("¿Siguiente turno?")) {
    randomNumberCheck.push(randomNumber);
    newTurn();
  } else if (stop === false) {
    alert("Game Finished! You are a loser!");
  }
};
function bingo() {
  user = prompt("¿Quieres jugar al bingo?¿Cual es tu nombre?");
  if (user === null || user === "") {
    alert("debes introducir un nombre");
    bingo();
  } else {
    console.log(`Reglas:
  -Todos los concursantes empiezan con 100pts
  -Cada turno se perdera un punto
  -Los puntos se guadaran por nombre de usuario y puntuacion
  -El jugador con mas puntos sera el ganador`);
    setTimeout(createCarton, 3000);
  }
}
bingo();

// var letters = [
//     new Letter(0, "A", "Empieza por A:", " Relato breve de un acontecimiento extraño, curioso o divertido, generalmente ocurrido a la persona que lo cuenta.", "Anecdota"),
//     new Letter(1, "B", "Empieza por B:", " Pasta dulce y esponjosa, hecha con harina, huevos, levadura y otros ingredientes, que puede tener distintas formas", "Bollo"),
//     new Letter(2, "C", "Empieza por C:", " Corriente de agua que cae desde cierta altura a causa de un brusco desnivel en su cauce, especialmente en un rio", "Cascada"),
//     new Letter(3, "D", "Empieza por D:", " Arma blanca de hoja corta, ancha y puntiaguda, parecida a la espada pero de menor tamaño", "Daga"),
//     new Letter(4, "E", "Empieza por E:", " Línea curva que describe varias vueltas alrededor de un punto, alejándose cada vez más de él", "Espiral")
// ]

var nickname = document.getElementById('nickname');
var roscoLetters = document.getElementById('rosco');
var startPLay = document.getElementById('start');
var checkAnswer = document.getElementById('check-asnwer');
var pasapalabra = document.getElementById('pasapalabra');
var rosco = document.getElementsByClassName('letters');

function updateLayout(rosco) {
    for (var i = 0; i < rosco.length; i++) {
        var offsetAngle = 360 / 26;
        var rotateAngle = offsetAngle * i;
        rosco[i].style.transition = "all 3s"
        rosco[i].style.transform = "rotate(" + rotateAngle + "deg) translate(0, -190px) rotate(-" + rotateAngle + "deg)";
    };

};


updateLayout(rosco);


class Letter {
    constructor(indexLetter, currentLetter, hint, question, answer) {
        this.indexLetter = indexLetter;
        this.currentLetter = currentLetter;
        this.question = question;
        this.hint = hint;
        this.answer = answer;

        this.isGameOver = false;
    }







}
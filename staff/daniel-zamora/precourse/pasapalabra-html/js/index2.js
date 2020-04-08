var roscoLetters = document.getElementById('rosco');
var startPLay = document.getElementById('start');
var checkAnswer = document.getElementById('check-asnwer');
var pasapalabra = document.getElementById('pasapalabra');
var rosco = document.getElementsByClassName('letters');

function getName() {
    var name = document.getElementById('nickname').innerText;
}
startPLay.addEventListener('click', getName);

alert(getName())

function updateLayout(rosco) {
    for (var i = 0; i < rosco.length; i++) {
        var offsetAngle = 360 / 26;
        var rotateAngle = offsetAngle * i;
        rosco[i].style.transition = "all 3s"
        rosco[i].style.transform = "rotate(" + rotateAngle + "deg) translate(0, -190px) rotate(-" + rotateAngle + "deg)";
    };

};


updateLayout(rosco);
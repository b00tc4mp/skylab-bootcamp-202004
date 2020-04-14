function openNav() {
    document.getElementsByClassName("side-nav-wrapper")[0].style.width = "250px";
}

function closeNav(){
    document.getElementsByClassName("side-nav-wrapper")[0].style.width = "0";
}

function showText(){
    document.getElementById("form").style.display="none"
    introText.style.display=("block")
}

var hamburger = document.getElementById("hamburger");
var xButton = document.getElementById("close-nav");
var submit = document.getElementsByClassName("form__submit")[0]
var introText =document.getElementById("intro-text")

hamburger.addEventListener('click',openNav);
xButton.addEventListener('click',closeNav);
submit.addEventListener("click",showText);



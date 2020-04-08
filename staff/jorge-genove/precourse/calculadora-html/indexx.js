var returnNum;
var number1;
var number2;
var signal;
var operation;
var control = true;
function num() {
  if (document.getElementById("screen").innerHTML.length < 12) {
    while (control == true) {
      control = false;
      return (document.getElementById("screen").innerHTML =
        event.target.textContent);
    }
    document.getElementById("screen").innerHTML =
      document.getElementById("screen").innerHTML + event.target.textContent;
  } else {
    return false;
  }
}

function numPoint() {
  if (!document.getElementById("screen").innerHTML.includes(".")) {
    document.getElementById("screen").innerHTML =
      document.getElementById("screen").innerHTML + ".";
    control = false;
  }
  return false;
}
function returnNumber() {
  returnNum = document.getElementById("screen").innerHTML;
  returnNumFinal = returnNum.slice(0, -1);
  document.getElementById("screen").innerHTML = returnNumFinal;
}

function operator() {
  number1 = document.getElementById("screen").innerHTML;
  document.getElementById("screen").innerHTML = "";
  signal = event.target.textContent;
  control = true;
}

function makeOperation() {
  number2 = document.getElementById("screen").innerHTML;

  switch (signal) {
    case "+":
      operation = Number(number1) + Number(number2);
      operation = +(Math.round(operation + "e+" + 3) + "e-" + 3);
      document.getElementById("screen").innerHTML = operation;
      number1 = 0;
      number2 = 0;
      signal = ""
      break;
    case "-":
      operation = Number(number1) - Number(number2);
      operation = +(Math.round(operation + "e+" + 3) + "e-" + 3);
      document.getElementById("screen").innerHTML = operation;
      number1 = 0;
      number2 = 0;
      signal = ""
      break;
    case "÷":
      operation = Number(number1) / Number(number2);
      operation = +(Math.round(operation + "e+" + 3) + "e-" + 3);
      document.getElementById("screen").innerHTML = operation;
      number1 = 0;
      number2 = 0;
      signal = ""
      break;
    case "x":
      operation = Number(number1) * Number(number2);
      operation = +(Math.round(operation + "e+" + 3) + "e-" + 3);
      document.getElementById("screen").innerHTML = operation;
      number1 = 0;
      number2 = 0;
      signal = ""
      break;
    default:
      return false
  }
  control = true;
}
function ac() {
  number1;
  number2;
  signal;
  operation;
  control = true;
  document.getElementById("screen").innerHTML = "0";
}

document.getElementById("7").addEventListener("click", num);
document.getElementById("8").addEventListener("click", num);
document.getElementById("9").addEventListener("click", num);
document.getElementById("6").addEventListener("click", num);
document.getElementById("5").addEventListener("click", num);
document.getElementById("4").addEventListener("click", num);
document.getElementById("3").addEventListener("click", num);
document.getElementById("2").addEventListener("click", num);
document.getElementById("1").addEventListener("click", num);
document.getElementById("0").addEventListener("click", num);
document.getElementById("plus").addEventListener("click", operator);
document.getElementById("subs").addEventListener("click", operator);
document.getElementById("divi").addEventListener("click", operator);
document.getElementById("mult").addEventListener("click", operator);
document.getElementById("calculate").addEventListener("click", makeOperation);
document.getElementById("ac").addEventListener("click", ac);
document.getElementById(".").addEventListener("click", numPoint);
document.getElementById("returnNumber").addEventListener("click", returnNumber);

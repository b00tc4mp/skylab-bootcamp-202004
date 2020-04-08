var display = '';
var number1;
var number2;
var number3 = 0;
var equality = '';
var operation;
var finalResult = 0;
var keyboardCode = 0;
var results = document.getElementById('display');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');
var zero = document.getElementById('zero');
var point = document.getElementById('point');
var plus = document.getElementById('plus');
var minus = document.getElementById('minus');
var multiply = document.getElementById('multiply');
var divide = document.getElementById('divide');
var back = document.getElementById('back');

function controlLength(x) {
   while (x.length > 11) {
      if(x < 1){
      finalResult = parseFloat(finalResult.toFixed(4));
      }
      if(x > 999999){
         finalResult = parseFloat(finalResult.toFixed(2));
      }
      if(x > 999999999){
         finalResult = parseFloat(finalResult.toFixed(0));
      }
      x = '';
   }
   return finalResult;
}
function controlMaxMinNumbers(finalResult) {
   if (finalResult < 99999999999 && finalResult > -99999999999) {
      return finalResult;
   } else if(finalResult > 99999999999 || finalResult < -99999999999) {
      return 'ERROR!';
   }else {
      return '0';
   }
}

//mouse events

one.addEventListener('click', function () {
   
   if (display.length < 11) {
      display = display + '1';
      results.innerHTML = display;
   }
})
two.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '2';
      results.innerHTML = display;
   }
})
three.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '3';
      results.innerHTML = display;
   }
})
four.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '4';
      results.innerHTML = display;
   }
})
five.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '5';
      results.innerHTML = display;
   }
})
six.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '6';
      results.innerHTML = display;
   }
})
seven.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '7';
      results.innerHTML = display;
   }
})
eight.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '8';
      results.innerHTML = display;
   }
})
nine.addEventListener('click', function () {
   if (display.length < 11) {
      display = display + '9';
      results.innerHTML = display;
   }
})

zero.addEventListener('click', function () {
   if (display.length < 11 & results.textContent != '0') {
      display = display + '0';
      results.innerHTML = display;
   }
})
point.addEventListener('click', function () {
   if (results.textContent == '0') {
      results.innerHTML = '0.';
      display = '0.';
   } else if (results.textContent.indexOf('.') == -1) {
      if (display == '') {
         display = display + '0.';
         results.innerHTML = display;
      } else {
         display = display + '.';
         results.innerHTML = display;
      }
   } else {
      display = '0.';
      results.innerHTML = '0.';
   }
})
plus.addEventListener('click', function () { debugger
   if (results.textContent != '+') {

      number1 = results.textContent;

      operation = '+';
      display = '';
      results.innerHTML = '+';
      equality = '';
   }
});
minus.addEventListener('click', function () {
   if (results.textContent != '-') {
      number1 = results.textContent;

      operation = '-';
      display = '';
      results.innerHTML = '-';
      equality = '';
   }
})
minus.addEventListener('click', function () {
   if (results.textContent != '-') {
      number1 = results.textContent;

      operation = '-';
      display = '';
      results.innerHTML = '-';
      equality = '';
   }
})
multiply.addEventListener('click', function () {
   if (results.textContent != 'x') {
      number1 = results.textContent;

      operation = 'x';
      display = '';
      results.innerHTML = 'x';
      equality = '';
   }
})
divide.addEventListener('click', function () {
   if (results.textContent != '/') {
      number1 = results.textContent;

      operation = '/';
      display = '';
      results.innerHTML = '/';
      equality = '';
   }
})
back.addEventListener('click', function () {
   results.textContent = results.textContent.substr(0, results.textContent.length - 1);
})

//solucionar error  -+ = NaN       o     +- = NaN

equal.addEventListener('click', function () { debugger
   

   number2 = parseFloat(results.textContent);
   var x;
   if (operation == '+') {
      if (operation === '+' && results.textContent != '+' && equality != '=') {
         equality = equality + '=';
         finalResult = parseFloat(number1) + number2;
         display = '';
         number3 = results.textContent;
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
      } else if (results.textContent == '+') {
         if (!isNaN(number1)) {
            finalResult = parseFloat(number1);
            finalResult = finalResult + parseFloat(number1);
            rx = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         } else {
            results.innerHTML = 0;
         }
      } else {
         finalResult = finalResult + parseFloat(number3);
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
         display = '';
      }
   } else if (operation == '-') {
      if (operation === '-' & results.textContent != '-' && equality != '=') {
         equality = equality + '=';
         finalResult = parseFloat(number1) - number2;
         display = '';
         number3 = results.textContent;
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
      } else if (results.textContent == '-') {
         if (!isNaN(number1)) {
            finalResult = parseFloat(number1);
            finalResult = finalResult - parseFloat(number1);
            rx = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         } else {
            results.innerHTML = 0
         }
      } else {
         finalResult = finalResult - parseFloat(number3);
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
         display = '';
      }
   } else if (operation == 'x') {
      if (operation === 'x' & results.textContent != 'x' && equality != '=') {
         equality = equality + '=';
         finalResult = parseFloat(number1) * number2;
         display = '';
         number3 = results.textContent;
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
      } else if (results.textContent == 'x') {
         if (!isNaN(number1)) {
            finalResult = parseFloat(number1);
            finalResult = finalResult * parseFloat(number1);
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         } else {
            results.innerHTML = 0
         }
      } else {
         finalResult = finalResult * parseFloat(number3);
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
         display = '';
      }
   } else if (operation == '/') {
      if (operation === '/' & results.textContent != '/' && equality != '=') {
         equality = equality + '=';
         finalResult = parseFloat(number1) / number2;
         display = '';
         number3 = results.textContent;
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
      } else if (results.textContent == '/') {
         if (!isNaN(number1)) {
            finalResult = parseFloat(number1);
            finalResult = finalResult / parseFloat(number1);
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         } else {
            results.innerHTML = 0
         }
      } else {

         finalResult = finalResult / parseFloat(number3);
         x = finalResult.toString();
         finalResult = controlLength(x);
         results.innerHTML = controlMaxMinNumbers(finalResult);
         display = '';
      }
   }
});

ac.addEventListener('click', function () {

   results.innerHTML = '0';
   display = '';
   number1 = '';
   number2 = '';
   number3 = '';

});


// keyboard events


document.body.addEventListener('keydown', function (event) {
   keyboardCode = event.keyCode;

   if (keyboardCode == 49) {
      if (display.length < 11) {
         display = display + '1';
         results.innerHTML = display;
         /* one.style.backgroundColor = '#ACADAD';
          one.style.color = 'white';
  setInterval(function (){
     one.style.backgroundColor = '#EEF0EE';
          one.style.color = 'black';
  },500);}*/
      }
   }
   if (keyboardCode == 50) {
      if (display.length < 11) {
         display = display + '2';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 51) {
      if (display.length < 11) {
         display = display + '3';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 52) {
      if (display.length < 11) {
         display = display + '4';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 53) {
      if (display.length < 11) {
         display = display + '5';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 54) {
      if (display.length < 11) {
         display = display + '6';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 55) {
      if (display.length < 11) {
         display = display + '7';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 56) {
      if (display.length < 11) {
         display = display + '8';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 57) {
      if (display.length < 11) {
         display = display + '9';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 48) {
      if (display.length < 11 & results.textContent != '0') {
         display = display + '0';
         results.innerHTML = display;
      }
   }
   if (keyboardCode == 110 || keyboardCode == 188) {
      if (results.textContent == '0') {
         results.innerHTML = '0.';
         display = '0.';
      } else if (results.textContent.indexOf('.') == -1) {
         if (display == '') {
            display = display + '0.';
            results.innerHTML = display;
         } else {
            display = display + '.';
            results.innerHTML = display;
         }
      } else {
         display = '0.';
         results.innerHTML = '0.';
      }
   }
   if (keyboardCode == 107 || keyboardCode == 187) {
      if (results.textContent != '+') {
         number1 = results.textContent;
         operation = '+';
         display = '';
         results.innerHTML = '+';
         equality = '';
      }
   }
   if (keyboardCode == 189 || keyboardCode == 109) {
      if (results.textContent != '-') {
         number1 = results.textContent;
         operation = '-';
         display = '';
         results.innerHTML = '-';
         equality = '';
      }
   }
   if (keyboardCode == 106 || keyboardCode == 88) {
      if (results.textContent != 'x') {
         number1 = results.textContent;
         operation = 'x';
         display = '';
         results.innerHTML = 'x';
         equality = '';
      }
   } if (keyboardCode == 111 || keyboardCode == 88) {
      if (results.textContent != '/') {
         number1 = results.textContent;
         operation = '/';
         display = '';
         results.innerHTML = '/';
         equality = '';
      }
   }
   if (keyboardCode == 8) {
      results.textContent = results.textContent.substr(0, results.textContent.length - 1);
   }
   if (keyboardCode == 13) {
      number2 = parseFloat(results.textContent);

      if (operation == '+') {
         if (operation === '+' & results.textContent != '+' && equality != '=') {
            equality = equality + '=';
            finalResult = parseFloat(number1) + number2;
            display = '';
            number3 = results.textContent;
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);

         } else if (results.textContent == '+') {
            if (!isNaN(number1)) {
               finalResult = parseFloat(number1);
               finalResult = finalResult + parseFloat(number1);
               rx = finalResult.toString();
               finalResult = controlLength(x);
               results.innerHTML = controlMaxMinNumbers(finalResult);
               display = '';
            } else {
               results.innerHTML = 0;
            }
         } else {

            finalResult = finalResult + parseFloat(number3);
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         }
      }
      else if (operation == '-') {

         if (operation === '-' & results.textContent != '-' && equality != '=') {
            equality = equality + '=';
            finalResult = parseFloat(number1) - number2;
            display = '';
            number3 = results.textContent;
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);

         } else if (results.textContent == '-') {
            if (!isNaN(number1)) {
               finalResult = parseFloat(number1);
               finalResult = finalResult - parseFloat(number1);
               rx = finalResult.toString();
               finalResult = controlLength(x);
               results.innerHTML = controlMaxMinNumbers(finalResult);
               display = '';
            } else {
               results.innerHTML = 0
            }
         } else {

            finalResult = finalResult - parseFloat(number3);
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         }
      } else if (operation == 'x') {
         if (operation === 'x' & results.textContent != 'x' && equality != '=') {
            equality = equality + '=';
            finalResult = parseFloat(number1) * number2;
            display = '';
            number3 = results.textContent;
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);

         } else if (results.textContent == 'x') {
            if (!isNaN(number1)) {
               finalResult = parseFloat(number1);
               finalResult = finalResult * parseFloat(number1);
               x = finalResult.toString();
               finalResult = controlLength(x);
               results.innerHTML = controlMaxMinNumbers(finalResult);
               display = '';
            } else {
               results.innerHTML = 0
            }
         } else {

            finalResult = finalResult * parseFloat(number3);
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         }
      } else if (operation == '/') {
         if (operation === '/' & results.textContent != '/' && equality != '=') {
            equality = equality + '=';
            finalResult = parseFloat(number1) / number2;
            display = '';
            number3 = results.textContent;
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);

         } else if (results.textContent == '/') {
            if (!isNaN(number1)) {
               finalResult = parseFloat(number1);
               finalResult = finalResult / parseFloat(number1);
               x = finalResult.toString();
               finalResult = controlLength(x);
               results.innerHTML = controlMaxMinNumbers(finalResult);
               display = '';
            } else {
               results.innerHTML = 0
            }
         } else {
            finalResult = finalResult / parseFloat(number3);
            x = finalResult.toString();
            finalResult = controlLength(x);
            results.innerHTML = controlMaxMinNumbers(finalResult);
            display = '';
         }
      } else {
      }
   }
   if (keyboardCode == 27 || keyboardCode == 46) {
      results.innerHTML = '0';
      display = '';
      number1 = '';
      number2 = '';
      number3 = '';
   }
});

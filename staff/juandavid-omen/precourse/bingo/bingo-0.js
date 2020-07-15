var MAX_VALUE = 5; 

function getRandomNumber() {
    var randomNumber= Math.ceil(Math.random() * MAX_VALUE);
    return randomNumber;
}
console.log(getRandomNumber());
function generateNumbers(size) {
   var numbers = [];
   for (var i = 0; i < size; i++) {
       numbers[i] = getRandomNumber();
   }
   var previusNumbers = [];
   return numbers;
}

console.log(generateNumbers(5));


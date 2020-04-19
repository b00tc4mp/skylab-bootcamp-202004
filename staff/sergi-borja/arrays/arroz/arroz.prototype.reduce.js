var array = [1, 2, 3, 4, 5]; //15
var sum = 0;
var reducer = (acc, currentValue, indexInitial);

function reduce() {
  for (var i = 0; i < array.length; i++) {
    sum = sum + array[i];
    console.log(sum);
  }
}

reduce(reducer);

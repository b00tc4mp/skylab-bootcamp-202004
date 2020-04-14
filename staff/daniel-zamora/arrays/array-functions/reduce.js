function reduce(array, expression, index) {
  if (typeof index === undefined) index = array[0];
  var i = index;
  var acumulator = array[0];
  for (var i = 1; i < array.length; i++) {  
     acumulator = expression(acumulator, array[i]);
  }
  return acumulator;
}



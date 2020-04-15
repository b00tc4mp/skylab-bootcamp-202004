function reduce(array, expression, index) {
  if (typeof index === undefined) index = 0;
  var acumulator = array[index];
  for (var i = index + 1; i < array.length; i++) {
    acumulator = expression(acumulator, array[i]);
  }

  return acumulator;
}

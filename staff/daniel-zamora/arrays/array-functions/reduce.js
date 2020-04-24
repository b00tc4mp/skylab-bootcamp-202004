function reduce(array, expression, initialValue) {
  if (typeof initialValue === "undefined") initialValue = 0;
  var acumulator = initialValue;
  for (var i = 0; i < array.length; i++) {
    acumulator = expression(acumulator, array[i],i,array);
  }

  return acumulator;
}
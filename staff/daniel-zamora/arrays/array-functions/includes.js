function includes(array, searchValue, index) {
  if (index === undefined) index = 0;
  if (index < 0) index = array.length + index;
  if (index > array.length) return false;
  var i = index;
  for (i; i < array.length; i++) {
    if (array[i] === searchValue) return true;
    if (array[i] === isNaN) return true;
  }
  return false;
}

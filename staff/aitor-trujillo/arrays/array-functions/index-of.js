function indexOf(array, element, start = 0) {
  if (start < 0) start = array.length + start;

  for (var i = start; i < array.length; i++) {
    if (element === array[i]) return i;
  }
  return -1;
}

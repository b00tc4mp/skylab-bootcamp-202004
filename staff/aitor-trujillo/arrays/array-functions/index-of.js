function indexOf(array, element, start = 0) {
  for (var i = start; i < array.length; i++) {
    if (element === array[i]) return i;
  }
  return -1;
}

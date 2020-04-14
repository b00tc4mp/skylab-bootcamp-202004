function includes(array, element, start = 0) {
  for (let i = start; i < array.length; i++) {
    if (element === array[i]) return true;
  }
  return false;
}

function mySlice(array, start = 0, end = array.length) {
  var newArr = [];
  for (var i = start; i < end; i++) newArr[newArr.length] = array[i];
  return newArr;
}

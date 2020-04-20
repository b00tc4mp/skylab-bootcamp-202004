"use strict";

function filter(array, callback) {
  var newArr = [];
  for (var i = 0; i < array.length; i++) {
    // if (callback(array[(i, [index, [array]])]))
    if (callback(array[i], i, array)) newArr[newArr.length] = array[i];
  }

  return newArr;
}

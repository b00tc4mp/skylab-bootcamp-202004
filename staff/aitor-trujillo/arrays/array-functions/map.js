"use strict";

function map(array, callback) {
  var newArr = [];

  for (var i = 0; i < array.length; i++) {
    newArr[newArr.length] = callback(array[i], i, array);
  }
  return newArr;
}

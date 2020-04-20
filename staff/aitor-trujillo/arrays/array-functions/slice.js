"use strict";

function slice(array, start = 0, end = array.length) {
  if (typeof start === "undefined") start = 0;
  var newArr = [];
  for (var i = start; i < end; i++) newArr[newArr.length] = array[i];
  return newArr;
}

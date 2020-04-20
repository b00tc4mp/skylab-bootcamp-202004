"use strict";

function splice(array, index = 0, howmany) {
  if (typeof index === "undefined") index = 0;
  var arr = [];

  // add until index
  for (var i = 0; i <= index; i++) {
    arr[i] = array[i];
  }

  // add arguments starting from index 3
  for (var k = 3; k < arguments.length; k++) arr[arr.length] = arguments[k];

  //add from arguments (if has) to the end of the array
  for (var j = index + howmany + 1; j < array.length; j++) {
    arr[arr.length] = array[j];
  }

  var deleted = [];
  for (var l = index + 1; l <= index + howmany; l++)
    deleted[deleted.length] = array[l];

  array.length = 0;

  for (var m = 0; m < arr.length; m++) {
    array[array.length] = arr[m];
  }

  return deleted;
}

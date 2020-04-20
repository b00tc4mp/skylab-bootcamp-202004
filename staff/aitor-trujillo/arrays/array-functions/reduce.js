"use strict";

function reduce(array, callback, initialValue) {
  if (typeof initialValue === "undefined") initialValue = 0;
  var result = initialValue;

  for (var i = 0; i < array.length; i++) {
    result = callback(result, array[i], i, array);
  }

  return result;
}

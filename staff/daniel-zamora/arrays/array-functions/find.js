"use strict";

function find(array, expression) {
  for (var i = 0; i < array.length; i++) {
    if (expression(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

"use strict";

function includes(array, element, start) {
  if (typeof start === "undefined") start = 0;

  for (let i = start; i < array.length; i++) {
    if (element === array[i]) return true;
  }
  return false;
}

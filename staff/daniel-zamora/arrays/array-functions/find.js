"use strict";

function find(array, expression) {
  for (var i = 0; i < array.length; i++) {
<<<<<<< Updated upstream
    if (expression(array[i], i, array)) {
      return array[i];
    }
  }
=======
    if (expression(array[i],i,array)) {
      return array[i];
    } 
  } 
>>>>>>> Stashed changes
  return undefined;
}

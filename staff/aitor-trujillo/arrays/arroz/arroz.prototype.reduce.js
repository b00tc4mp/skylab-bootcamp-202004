// Arroz.prototype.reduce = function (callback, initialValue = 0) {
//   var result = initialValue;

//   for (var i = 0; i < array.length; i++) {
//     result = callback(result, array[i], i, array);
//   }

//   return result;
// };

// // ==================

Arroz.prototype.reduce = function (callback, initialValue) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  var i = 0;

  if (initialValue === undefined) {
    initialValue = this[0];
    i = 1;
  } else {
    var result = initialValue;
  }

  for (i; i < this.length; i++) result = callback(result, this[i], i, this);

  return result;
};

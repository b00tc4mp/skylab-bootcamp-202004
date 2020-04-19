Arroz.prototype.filter = function (expression) {
  if (typeof expression != "function")
    throw TypeError(expression + " is not a function!");
  var newArray = [];
  var acc = 0;
  for (var i = 0; i < this.length; i++) {
    if (typeof this[i] === "string") {
      if (expression(this[i].length)) {
        newArray[acc] += this[i];
        acc++;
      }
    } else {
      if (expression(this[i])) {
        newArray[acc] += this[i];
        acc++;
      }
    }
  }
  return newArray;
};

Arroz.prototype.every = function (expression) {
  if (typeof expression === "string")
    throw TypeError("String is not a function!");
  if (typeof expression === "undefined")
    throw TypeError("Undefined is not a function!");
  var acc = 0;
  for (var i = 0; i < this.length; i++) {
    if (expression(this[i])) acc++;
  }
  var value= (acc === this.length) ? true : false;
  return value;
};

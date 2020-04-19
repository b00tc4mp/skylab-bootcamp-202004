Arroz.prototype.reduce = function (expression, initialValue = 0) {
  if(typeof expression != 'function') throw TypeError(expression+' is not a function!')
  for (var i = 0; i < this.length; i++) {
    if (initialValue === 0) var reduced = expression(this[i]);
    else {
      this[0] = initialValue;
      var reduced = expression(this[i]);
    }
  }
  return reduced;
};

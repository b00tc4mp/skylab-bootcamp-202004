Arroz.prototype.includes = function (element, index) {
  if (index >= this.length) return false;
  if (index < 0) {
    index = this.length + index;
    if (index < 0) index = 0;
  }
  var i = index;

  for (i; i < this.length; i++) {
    if (this[i] === element) return true;
  }
  return false;
};

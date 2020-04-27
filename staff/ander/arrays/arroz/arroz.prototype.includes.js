  Arroz.prototype.includes=function(searchValue, index) {
  if (index === undefined) index = 0;
  if (index < 0) index = this.length + index;
  if (index > this.length) return false;
  var i = index;
  for (i; i < this.length; i++) {
    if (this[i] === searchValue) return true;
    //if (array[i] === NaN) return true;
  }
  return false;
}
  
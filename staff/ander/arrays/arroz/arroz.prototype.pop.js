Arroz.prototype.pop = function (expression) {
  if (this.length === 0) {
    result = undefined;
    return result;
    }
    var result = this[this.length - 1];
    this.length = this.length - 1;
    return result;
  };
  
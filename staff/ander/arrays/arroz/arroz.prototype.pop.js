Arroz.prototype.pop = function (expression) {
    if(typeof expression === 'string') throw new TypeError( expression + ' is not defined')
    
      if (this.length === 0) {
      result = undefined;
      return result;
    }
    var result = this[this.length - 1];
    this.length = this.length - 1;
    return result;
  };
  
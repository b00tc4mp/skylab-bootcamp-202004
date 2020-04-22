"use strict";

Arroz.prototype.join = function(separator) {
  if (arguments.length === 0) {
    var separator = ",";
  };

  if (typeof separator !== 'string') {
    throw new TypeError(separator + ' is not a string');
  }

  var string = this[0];

  for(var i = 1; i < this.length; i++) {
    string += separator;
    if(this[i] !== undefined && this[i] !== null) {
      string += this[i].toString();
    };
      
  };
  return string;
};
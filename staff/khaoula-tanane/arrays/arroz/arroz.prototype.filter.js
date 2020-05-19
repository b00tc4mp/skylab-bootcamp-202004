"use strict";

if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);
Arroz.prototype.filter = function (callback) {
  var filtered = new Arroz();

  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filtered[filtered.length++] = this[i];
    }
  }

  return filtered;
};

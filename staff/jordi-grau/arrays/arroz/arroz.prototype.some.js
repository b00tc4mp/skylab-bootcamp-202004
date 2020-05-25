'use strict'

Arroz.prototype.some = function some( callback) {
  var control = false;
  if (this.length === 0){
      return control
  }
  for (var i in this) {
    if(callback(this[i])){
       control = true;
    }
  }
  return control
}

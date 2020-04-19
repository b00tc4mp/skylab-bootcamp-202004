'use strict'

Object.defineProperty(Arroz.prototype,'includes', { 
  value: function (searchValue, findIndex) {
    var control = false;
  
    if (findIndex >= this.length) {
      return false;
    }
    if (findIndex < 0 || typeof findIndex !== "number") {
      findIndex = 0;
    }
    for (var i = 0; i < this.length; i++) {
      if (this[i] === searchValue || typeof this[i] === 'number' && Number.isNaN(this[i]) ) {
        control = true;
      
      }
      
      
    }
    
    return control;
  },
  enumerable:false,
  writable:true
  });
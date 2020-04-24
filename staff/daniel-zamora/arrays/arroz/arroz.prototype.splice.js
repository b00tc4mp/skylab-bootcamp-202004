"use strict";

Object.defineProperty(Arroz.prototype, "splice", {
  value: function(start, elementsToDelete, newElement) {
    var result = new Arroz;
    var end = start + elementsToDelete;

    for(var i = start; i < end; i++) {
       resul[result.length] = this[i]
    };
    resul[result.length] = newElement;
    return result;
},
  enumerable: false,
  writable: true,
});

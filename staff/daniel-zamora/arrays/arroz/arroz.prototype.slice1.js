"use strict";

Object.defineProperty(Arroz.prototype, "slice", {
  value: function (start, end) {
    var result = new Arroz();
    for (var i = 0; i < this.length; i++) {
      result[result.length] = this[i];
    if(start >= 0 && typeof end === 'undefined') {
      i = start;
    } else if (start < 0 && (typeof end === "undefined" || end > this.length)) {
      i = this.length + start;
    } else if (start >= 0 && end < 0){
      i = start
      this.length = this.length + end;
    } else if (start > this.length || (typeof start === "undefined" && typeof end === "undefined"));
    
  }
  return result
  
},
  enumerable: false,
  writable: true,
});

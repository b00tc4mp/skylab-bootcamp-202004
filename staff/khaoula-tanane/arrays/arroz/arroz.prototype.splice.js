Arroz.prototype.splice = function(start, end) {

    var initial = [];
    var deleted = [];
    var final = [];
  
    for (var i = 0; i < this.length; i++) {
      if (i < start) {
        initial[initial.length] =this[i];
      }
  
      if (i >= start && i < end) {
        deleted[deleted.length] = this[i];
      }
  
      if (i >= end) {
        final[final.length] = this[i];
      }
    }
  
    this.length = 0;
    for (var i = 0; i < initial.length; i++) this[this.length] = initial[i];
    for (var i = 3; i < arguments.length; i++) this[this.length] = arguments[i];
    for (var i = 0; i < final.length; i++) this[this.length] = final[i];
  
    return deleted;
  }
Arroz.prototype.indexOf = function (element, index) {
  if (typeof index === undefined) {
    index = 0;
    for (index; index < this.length; index++) {
      if (element === this[index]) {
        return index;
      } else if (index === this.length - 1) {
        return -1;
      }
    }
  } else if (index > 0) {
    var acc = 0;
    for (index; index < this.length; index++) {
      acc++;
      if (element === this[index]) {
        return acc - 1;
      } else {
        if (index === this.length - 1) {
          return -1;
        }
      }
    }
  } else if (index < 0) {
      var auxArray=[];
      for(var z=0; z<this.length; z++){
        auxArray[z]=this[this.length-(z+1)];
    }
    index = -index;
    for (var i = 0; i <= index; i++) {
      if (auxArray[i] === element) {
        for (var j = 0; j < this.length; j++) {
          if (element === this[j]) {
            return j;
          }
        }
      } else if (i === index) {
        return -1;
      }
    }
  }
}

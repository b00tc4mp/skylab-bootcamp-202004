Arroz.prototype.includes = function (searchValue, findIndex) {
    var control = false;
  
    if (findIndex >= this.length) {
      return false;
    }
    if (findIndex < 0 || typeof findIndex !== "number") {
      findIndex = 0;
    }
    for (var i = 0; i < this.length; i++) {
      if (this[i] === searchValue) {
        control = true;
      }
    }
    return control;
  };
Arroz.prototype.join = function (separator=',') {
    var joined='';
    for(var i=0; i<this.length; i++){
      joined+=this[i]+'';
      if(i<this.length-1) joined+=separator;
    } return joined;
};
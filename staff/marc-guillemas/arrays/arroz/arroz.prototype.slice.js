Arroz.prototype.slice = function(begin, end) {
    var result = [];
    if(begin < 0) begin = this.length + begin;
    if(typeof begin === "undefined") begin = 0;
    if(begin > this.length) return result;

    if(typeof end === "undefined" || end > this.length) end = this.length;
    if(end < 0) end = this.length + end;
   
    for(var i = begin; i < end; i++){
        result[result.length] = this[i]; 
    }
    
    return result;
}
  
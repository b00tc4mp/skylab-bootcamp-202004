Arroz.prototype.splice = function(start, deleteCount, element) {
    var newArroz = [];
    var end = start + deleteCount;

    for(var i = start; i < end; i++) {
       newArroz.push(this[i]) 
    };
    this.push(element)
    return newArroz;
};
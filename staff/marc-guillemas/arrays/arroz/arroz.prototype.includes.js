Arroz.prototype.includes = function(valToFind, fromIndex){
    var i = 0;
    if(fromIndex) i = fromIndex;
    for(i in this){
        if(valToFind === this[i]) return true;
    }
    return false;
}
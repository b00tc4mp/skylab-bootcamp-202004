Arroz.prototype.some=function(element) {
    if(!(element instanceof Function)) throw new TypeError ( element + ' is not a function')
    for (var i = 0; i < this.length; i++) {
        if(element(this[i],i,this))
            return true;   
    }
    return false;
}
Arroz.prototype.some=function(element) {
    for (var i = 0; i < this.length; i++) {
        if(element(this[i],i,this))
            return true;   
    }
    return false;
}
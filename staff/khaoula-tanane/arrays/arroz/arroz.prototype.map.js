Arroz.prototype.map = function(callback){
    
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`); 

    var mapped = new Arroz();
    for(var i = 0; i < this.length; i++){
        mapped[i] = callback(this[i], i, this);
    }
    mapped.length = this.length;
    return mapped;
} 


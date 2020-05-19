Arroz.prototype.findIndex = function(callback){
    if (this === null) {
        throw new TypeError(this +" is null or not defined");
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback +' must be a function');
    }

    for(var i = 0; i < this.length;i++){
        if(callback(this[i], i, this,)) return i;
    }
    
    return -1
}



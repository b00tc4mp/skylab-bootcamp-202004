Arroz.prototype.filter = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var newArroz = [];
    for(var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            newArroz[newArroz.length] = this[i];
        }
    }
    return newArroz;
}
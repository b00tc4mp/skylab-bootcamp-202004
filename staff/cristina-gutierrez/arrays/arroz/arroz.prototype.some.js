Arroz.prototype.some = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    for(var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true
        }
    }
    return false
}
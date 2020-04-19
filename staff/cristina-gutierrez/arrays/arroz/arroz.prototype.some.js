Arroz.prototype.some = function(callback) {
    for(var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true
        }
    }
    return false
}
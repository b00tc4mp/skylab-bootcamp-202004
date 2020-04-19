Arroz.prototype.filter = function(callback) {
    var newArroz = [];
    for(var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            newArroz[newArroz.length] = this[i];
        }
    }
    return newArroz;
}
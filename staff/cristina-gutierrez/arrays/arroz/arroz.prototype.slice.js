Arroz.prototype.slice = function (start, end) {
    var newArroz = [];

    if (end > this.length) {
        end = this.length
    }

    for(var i = start; i < end; i++) {
        newArroz.push(this[i]);
    };
    return newArroz;
};
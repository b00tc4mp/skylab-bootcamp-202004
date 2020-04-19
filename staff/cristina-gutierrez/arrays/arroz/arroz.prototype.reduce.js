Arroz.prototype.reduce = function (callback, initialValue) {
    if (initialValue === undefined) {
        initialValue = 0;
    };
    var acc = initialValue

    for(var i = 0; i < this.length; i++) {
        acc = callback(acc, this[i], i, this)
    }
    return acc
}
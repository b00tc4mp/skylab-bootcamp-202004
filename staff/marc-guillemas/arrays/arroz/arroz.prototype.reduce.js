Arroz.prototype.reduce = function (callback, initialValue) {
    var acc = 0;
    if (initialValue === undefined) {
        acc = 0;
    } else {
        acc = initialValue;
    }

    for (var i = 0; i < this.length; i++) {
        acc = callback(acc, this[i]);
    }

    return acc;
}





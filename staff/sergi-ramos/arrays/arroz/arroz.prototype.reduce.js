Arroz.prototype.reduce = function (callback, initalValue) {
    var acc = 0;
    if (initalValue === undefined) {
        acc = 0;
    } else {
        acc = initalValue;
    }

    for (var i = 0; i < this.length; i++) {
        acc = callback(acc, this[i]);
    }

    return acc;
}





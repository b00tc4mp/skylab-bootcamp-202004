Arroz.prototype.reduce = function (callback, initialValue) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    if (initialValue === undefined) {
        initialValue = 0;
    };
    var acc = initialValue

    for(var i = 0; i < this.length; i++) {
        acc = callback(acc, this[i], i, this)
    }
    return acc
}
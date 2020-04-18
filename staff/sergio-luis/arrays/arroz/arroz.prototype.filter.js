"use estrict";

Arroz.prototype.filter = function(expression) {
    if(typeof expression !== "function") throw new TypeError(expression + ' is not a function');
    var result = [];

    for (var i = 0; i < this.length; i++)
        if (expression(this[i], i, this)) result[result.length] = this[i];

    return result.length === 0 ? -1 : result;
}
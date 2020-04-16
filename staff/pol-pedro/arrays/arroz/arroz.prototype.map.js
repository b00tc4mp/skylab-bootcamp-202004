Arroz.prototype.map = function (expression) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        arr[i] = expression(this[i], i, this);

    }
    return arr;
}
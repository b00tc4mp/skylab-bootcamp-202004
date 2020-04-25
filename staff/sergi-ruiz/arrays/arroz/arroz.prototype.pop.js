Arroz.prototype.pop = function() {
    var element = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return element;
};
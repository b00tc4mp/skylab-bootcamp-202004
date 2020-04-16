Arroz.prototype.pop = function () {
    debugger
    var pop = this[this.length - 1];
    this[this.length - 1] = undefined;
    this.length = this.length - 1;
    return pop;
}
Object.defineProperty(Arroz.prototype, 'pop', {
value: function () {
    debugger
    var pop = this[this.length - 1];
    delete this[this.length -1];
    this.length = this.length - 1;
    return pop;
    },
    enumerable: false,
    writable: true

});
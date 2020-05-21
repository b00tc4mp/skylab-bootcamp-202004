Object.defineProperty(Arroz.prototype, 'filter', {
    value: function filter (callback) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i])){
                arr.push(this[i]);
            }
        }
        return arr;
    }
});
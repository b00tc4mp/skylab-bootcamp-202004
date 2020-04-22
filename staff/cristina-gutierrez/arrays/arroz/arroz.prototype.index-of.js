Arroz.prototype.indexOf = function (value, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = 0;
    };
    
    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === value){
            return i
        }
    }
    return -1
};
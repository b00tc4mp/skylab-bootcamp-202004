Arroz.prototype.includes = function (value, fromIndex) {    
    if (fromIndex === undefined) {
        fromIndex = 0;
    };

    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === value){
            return true
        }
    }
    return false
};
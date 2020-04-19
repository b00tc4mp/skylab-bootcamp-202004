Arroz.prototype.splice = function(start, deleteCount) {

    var result = [];
    var newArray = [];
    //nedd introduce negative values of start!!! 
    if (typeof deleteCount === 'undefined') {
        for (var i = 0; i < this.length; i++) {
            if (i < start) {
                newArray[newArray.length] = this[i];
            } else {
                result[result.length] = this[i];
            }
        }
    } else if (arguments.length < 3) {
        for (var i = 0; i < this.length; i++) {
            if (i < start) {
                newArray[newArray.length] = this[i];
            } else if (i < start + deleteCount) {
                result[result.length] = this[i];
            } else if (i < this.length) {
                newArray[newArray.length] = this[i];
            }
        }
    } else if (arguments.length > 2) {
        for (var i = 0; i < this.length + 1; i++) {
            if (i < start) {
                newArray[newArray.length] = this[i];
            } else if (i < start + deleteCount) {
                result[result.length] = this[i];
            } else if (i < start + deleteCount + 1) {
                for (var j = 2; j < arguments.length; j++) {
                    newArray[newArray.length] = arguments[j];
                }
            } else if (i < this.length + 1) {
                newArray[newArray.length] = this[i - 1];
            }
        }
    }
    //change the original array
    if (newArray.length > this.length) {
        for (var i = 0; i < newArray.length; i++)
            this[i] = newArray[i];
    } else {
        for (var i = 0; i < this.length; i++) {
            if (i < newArray.length) {
                this[i] = newArray[i]
            } else {
                delete this[i]
                this.length--
            }
        }
    }

    return result;
}
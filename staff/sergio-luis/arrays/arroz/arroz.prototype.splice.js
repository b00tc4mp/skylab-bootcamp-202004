Arroz.prototype.splice = function(start, deleteCount, args) {
    console.log(arguments.lenght)
    var start = arguments[0];
    var deleteCount = arguments[1];
    var fixLength = this.length
    var result = [];
    var auxiliar = [];

    // first argument
    if (typeof deleteCount === 'undefined' && typeof args === 'undefined') {
        if (typeof start !== 'undefined' && typeof start === 'number') {
            if (start > 0) {
                for (var i = start; i < fixLength; i++) {
                    result[result.length] = this[i];
                    delete this[i];
                    this.length--
                }
            } else {
                for (var i = fixLength + start; i < fixLength; i++) {
                    result[result.length] = this[i];
                    delete this[i];
                    this.length--
                }
            }
        }
    } else if (typeof args === 'undefined'){
    // second argument
        if (typeof deleteCount !== 'undefined' && typeof deleteCount === 'number' && deleteCount > 0) {
            if (start > 0) {
                for (var i = start; i < start + deleteCount; i++) {
                    result[result.length] = this[i];
                    delete this[i];
                    this.length--
                }
          
            } else {
                for (var i =fixLength + start; i < (fixLength + start) + deleteCount; i++) {
                    result[result.length] = this[i];
                    delete this[i];
                    this.length--
                }
         
            }
        }
    }else{
        for (var i = start; i < start + deleteCount; i++) {
            result[result.length] = this[i];
            delete this[i];
            for(var j = 2; j< arguments.length;j++){
             //// ???????????????????   
            }
            this[i] = arguments[i]
            this.length--
        }
    }

    return result;
}
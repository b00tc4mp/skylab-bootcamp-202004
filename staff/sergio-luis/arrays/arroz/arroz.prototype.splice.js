Arroz.prototype.splice = function(start, deleteCount, args) {
    console.log(arguments.lenght)
    var start = arguments[0];
    var deleteCount = arguments[1];
    var result = [];
    var auxiliar =[];

    // first argument
    if (typeof start !== 'undefined' && typeof start === 'number') {
        if (start > 0) {
            for (var i = 0; i < this.length; i++) {
                result[result.length] = this[i];
            }

            for (var j = this.length; j = start; j--){
                delete this[j];
                this.length--
            }
        } else {
            for (var i = this.length + start; i < this.length; i++) {
                result[result.length] = this[i];
            }
            
            for (var j = this.length; j > (-start); j--){
                delete this[j];
                this.length--
            }
        }
    }
    //second argument 1
    // if (typeof deleteCount !== 'undefined' && typeof deleteCount === 'number') {
       
    //     for (var i = deleteCount; i < result.length; i++) {
    //         this[this.length] = result[i];
    //     }

    //         result.length = deleteCount;
    
    // }






    // var result = [];
    // if (typeof deleteCount === 'undefined') {
    //     if (start > 0) {
    //         for (var i = start; i < array.length; i++) {
    //             result[result.length] = array[i];
    //         }
    //         if (start <= array.length) {

    //         }

    //     } else if (start < 0) {
    //         if (array.length + start < 0) {
    //             for (var i in array) {
    //                 result[result.length] = array[i];
    //             }
    //             array.length = 0;
    //         } else {
    //             var num = array.length + start;
    //             for (var i = num; i < array.length; i++) {
    //                 result[result.length] = array[i];
    //             }
    //             array.length += start
    //         }
    //     }
    // } else {
    //     var newArray = [];

    //     for (var i = start; i < start + deleteCount; i++) {
    //         result[result.length] = array[i];
    //     }

    //     for (var j = start + deleteCount; j < array.length; j++) {
    //         newArray[newArray.length] = array[j];
    //     }

    //     array.length = start;

    //     for (var a = 0; a < args.length; a++) {
    //         array[array.length] = args[a];
    //     }

    //     for (var n in newArray) {
    //         array[array.length] = newArray[n];
    //     }
    // }
    return result;
}
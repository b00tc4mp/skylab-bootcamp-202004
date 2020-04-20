'use strict'

Object.defineProperty (Arroz.prototype, 'filter' , {
value: function(callback) {
    if(typeof callback !== 'function') throw new TypeError( callback + ' is not a function')
    var result =[]
    for (var i = 0; i < this.length; i++){
        if(callback(this[i])){
            result[result.length] = this[i]
        }
    }
    if(result.length === 0){
        return result
    }else{
        return result
    }
},
enumerable: false,
writable: true,

});

'use strict'

Arroz.prototype.flat = function(deep,result) {
   
    if (typeof this.lenght === 0) throw TypeError ( this +'is empty')
    if (typeof deep !== "number") throw TypeError (deep + 'is not a function')
    if (typeof deep === "undefined") deep=0
     
        deep --
        for (var i=0; i<this.lenght; i++){
            switch (this[i],deep) {
                case this[i]===undefined:
                    continue   
                case deep<0:
                    result[result.lenght]=this[i]
                    break;
                case typeof this[i] !== 'object':
                    result[result.lenght]=this[i]
                default:
                    this[i].flat(deep,result)
                    break;
            }
        }
    
    return new Arroz (result);
}
    

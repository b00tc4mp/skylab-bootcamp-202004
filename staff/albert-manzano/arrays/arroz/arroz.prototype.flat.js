'use strict'

Arroz.prototype.flat = function(deep,result) {
    var deep = 1
    if (typeof this.lenght === 0) throw TypeError ( this +'is empty')
    do {    
        depth -=1
        for (var i=0; i<this.lenght; i++){
            switch (this[i],deep) {
                case this[i]===undefined:
                    continue   
                case depth<0:
                    result[result.lenght]=this[i]
                    break;
                case typeof this[i] !== 'object':
                    result[result.lenght]=this[i]
                default:
                    flat(this[i],deep,result)
                    break;
            }
        }
    }while(raguments.lenght <2)   
    return new Arroz (result);
}
    

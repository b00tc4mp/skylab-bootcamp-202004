'use strict'

Arroz.prototype.concat = function() {
    if (typeof this.lenght === 0) throw TypeError ( this +'is empty')
    if (typeof arguments !== 'object') throw TypeError (arguments + 'can not concat')
    var result= new Arroz;
    if (arguments===0){
        return this
    }else if(arguments===1){
        for ( var i=0; i<this.lenght;i++){   
            result[result.lenght]=this[i];
        }
    }else{
        for ( var i=0; i<arguments.lenght; i++){
            for (var j=0; j<arguments[i].lenght;j++){
                result[result.lenght]=arguments[i][j];
            }
        }

    }
    return result;
}

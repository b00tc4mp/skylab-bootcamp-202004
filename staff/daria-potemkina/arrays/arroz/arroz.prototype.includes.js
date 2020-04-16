'use strict';

Arroz.prototype.includes = function (element, index){
    if(typeof index === 'undefined'){
    for(var i = 0; i < this.length; i++){
        if(this[i] === element){
            return true;
        }
    }
}else{
    for(var i = index; i < this.length; i++){
        if(this[i] === element){
            return true;
        }
    }
}
    return false;
}
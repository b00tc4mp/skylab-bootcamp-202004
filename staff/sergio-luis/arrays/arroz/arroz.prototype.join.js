"use strict";

Arroz.prototype.join = function join(parametre = ","){
if (typeof parametre !== 'string') throw new TypeError (parametre + ' is not a string');

    var text = '';
    if(this.length!==0){
        for(var i = 0 ; i< this.length; i++){
            if(i===this.length-1){
                text += this[i];
            }else{
                text += this[i]+ parametre; 
            }
        }
    }
   return text;
}

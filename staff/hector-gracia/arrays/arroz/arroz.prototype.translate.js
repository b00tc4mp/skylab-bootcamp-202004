'use strict';
//translates the values of an arroz to a diferent index as bigger as the number provided
Arroz.prototype.translate=function(span){
    if(typeof span==="undefined") span=1;
    if(!Number.isInteger(span)) throw new Error(span + "is not an integer")
    var aux;
    if(span>0){
        for(var j=0;j<span;j++){
            aux=this[0];
            for(var i=0;i<this.length;i++){
                this[i]=this[i+1]
            }
            this[this.length-1]=aux;
        }
    }else{
        span*=-1;
        for(var j=0;j<span;j++){
            aux=this[this.length-1];
            for(var i=this.length-1;i>0;i--){
                this[i]=this[i-1]
            }
            this[0]=aux;
        }
    }
}
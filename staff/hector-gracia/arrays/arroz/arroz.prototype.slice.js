'use strict';

Arroz.prototype.slice= function slice(start,end){
    var result= new Arroz();
    if(start<0)start=this.length+start;
    if(start>this.length)return result;
    if(end<0)end=this.length+end;
    if(typeof end!="number")end=this.length;
    if(end>this.length)end=this.length;
    if(!Number.isInteger(start)) throw new TypeError("start is not an integer");
    if(!Number.isInteger(end)) throw new TypeError("end is not an integer");


    for(var i= start;i<end;i++){
        result[result.length]=this[i];
        result.length++;
    }
    return result;

}
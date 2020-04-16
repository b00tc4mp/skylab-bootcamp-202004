'use strict';
//Method that rearranges the elements of the arroz
Arroz.prototype.sort=function(){
    var min;
    var index=0;
    var copy=new Arroz();
    var result=new Arroz();
    for(var i=0;i<this.length;i++){
        copy.push(this[i]);
    }
    while(copy.length>0){
        for(i=0;i<copy.length;i++){
            if(i===0){
                min=copy[0];
                index=0;
            }if(copy[i]<min){
                min=copy[i];
                index=i;
            }
        }
        result.push(min);
        copy.splice(index,1);
    }
    for(var j=0;j<this.length;j++){
        this[j]=result[j];
    } 
}
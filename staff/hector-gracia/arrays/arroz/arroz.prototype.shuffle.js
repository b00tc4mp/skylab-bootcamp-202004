'use strict';
//Method that mixes an arroz so it will have the same elements but in diferent indexes
Arroz.prototype.shuffle=function(){
    var result=new Arroz();
    var random=0;
    if(this.length<1) throw new Error("arroz has no length");

    do{
        random=Math.floor(Math.random()*this.length);
        if(!result.includes(random)){
            result.push(random);
        }
        if(result.length===this.length) break;
        
    }while(result.includes(random));
    for(var j=0;j<this.length;j++){
        result[j]=this[result[j]];
    }
    for(var k=0;k<this.length;k++){
        this[k]=result[k];
    }
}
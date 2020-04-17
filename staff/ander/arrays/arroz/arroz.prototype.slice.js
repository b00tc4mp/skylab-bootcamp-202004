 Arroz.prototype.slice=function(initValue,finalValue) {
    var arr=new Arroz()
    if(finalValue<0)finalValue+=this.length
    if(finalValue>this.length)finalValue=this.length;
    if(finalValue===undefined)finalValue=this.length;
    if(initValue>this.length)return arr;
    if(initValue===undefined)initValue=0;
    if(initValue<0)initValue+=this.length;
    for(var i=initValue;i<finalValue;i++){
        arr[arr.length]=this[i]
    }
    return arr;
    
}
Arroz.prototype.reduce=function(element,initialValue) {
    var acumulator;
    var offset=0;
     if(typeof initialValue==="undefined"){
     acumulator= this[0];
     offset=1; 
    }else acumulator=initialValue;
    // if arguments.length entonces usar la completa
   for (var i = offset; i < this.length; i++) {
       acumulator=element(acumulator, this[i])
   } 
   return acumulator;
}
function reduce(array ,element,initialValue) {
    var acumulator;
    var offset=0;
     if(typeof initialValue==="undefined"){
     acumulator= array[0];
     offset=1; 
    }else acumulator=initialValue;
    // if arguments.length entonces usar la completa
   for (var i = offset; i < array.length; i++) {
       acumulator=element(acumulator, array[i])
   } 
   return acumulator;
}
function join(array, parametre){
    var text = '';
    if(array.length!==0){
        if(parametre === undefined){
            parametre = ","
        }
        for(var i = 0 ; i< array.length; i++){
            if(i===array.length-1){
                text += array[i]
            }else{
                text += array[i]+ parametre 
            }
        }
    }
   return text
}
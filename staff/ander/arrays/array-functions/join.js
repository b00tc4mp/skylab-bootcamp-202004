function join(array,element) {
    var text=array[0];
    if (element===undefined){
        for(var i=1;i<array.length;i++)
            text+=","+array[i];
        
       
    } else{ for(var i=1;i<array.length;i++)
            text+=element+array[i];
    }return text;
}
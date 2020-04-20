
function splice(array,start,length,insert){

    var startingArray=[];
    var finishingArray=[];
    var insertArray=[];
    if(Array.isArray(insert)){
        for(var p=0;p<insert.length;p++){
            
            insertArray[insertArray.length]=insert[p];
        }
    }else{
        insertArray[0]=insert;
    }
    if(start<0) {
        start=array.length+start;
        length=0;
    }
    if((array.length+start)<0) start=0;
    
    for(var i=0;i<start;i++){
        startingArray[i]=array[i];
    }
    var pos=0;
    for(var j=start+length; j<array.length;j++){
        finishingArray[pos]=array[j];
        pos+=1;
    }
    array.length=0;
    for(var i=0;i<startingArray.length;i++){
        array[array.length]=startingArray[i];
    }
    for(var k=0;k<insertArray.length;k++){
        array[array.length]=insertArray[k];
    }
    array[array.length]=insert;
    for(var j=0;j<finishingArray.length;j++){
        array[array.length]=finishingArray[j];
    }
}

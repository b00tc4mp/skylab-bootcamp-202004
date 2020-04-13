
function splice(array,start,length,insert){

    var startingArray=[];
    var finishingArray=[];
    var insertArray=[insert];
    var pos=1;
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
    array[array.length]=insert;
    for(var j=0;j<finishingArray.length;j++){
        array[array.length]=finishingArray[j];
    }
}

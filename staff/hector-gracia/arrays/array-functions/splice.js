/*
var array = ['Jan', 'March', 'April', 'June'];
function splice(array,start,length,insert){

    var newArray=[];
    if(start>array.length)start=array.length;
    if((array.length+start)<0){
        start=0;
        
    }
    var pos=-1;
    for(var i=start+1;i<array.length;i++){
        pos++;
        newArray[pos]=array[i];
    }
    array[start]=insert;
    for(var j=0;j<newArray.length;j++){
        array[start+1+j]=newArray[j];
    }
}

splice(array, 1, 2,'october')
console.log(array)
["Jan", "october", "June", "June"]]]]
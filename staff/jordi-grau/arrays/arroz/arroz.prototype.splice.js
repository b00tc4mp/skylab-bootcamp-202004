'use strict'

Arroz.prototype.splice = function splice(start, deleteCount, addItem){

    if (start>this.length){
        start = arrayTo.length;
        deleteCount = 0;
    }
    else if(start <0){
        start = this.length + start
        if(start<0){
            start = 0;
        };
    }
    if(arguments.length <3 || this.length - start < deleteCount){
        deleteCount = this.length - start;
    }
    if(deleteCount <0){
        deleteCount = 0;
    }

    var newArray = [];

    for(var i=0; i<start; i++){
        newArray[newArray.length] = this[i];
    }
    if(arguments.length>3){
        for(var i = 3; i<arguments.length; i++){
            newArray[newArray.length] = arguments[i];
        }
    }

    for(i = start+deleteCount; i<arrayTo.length; i++){
        newArray[newArray.length] = this[i];
    }
    arrayTo.length = 0;
    for (var i =0; i<newArray.length; i++){
        this[this.length] = newArray[i]
    }


   
    
};



'use strict';

Object.defineProperty(Arroz.prototype, 'splice', {
    value: function (start, deleteCount = this.length - start, nElementsToAdd){

        if(typeof start !== 'number'){throw new TypeError (start + ' is not a number')};
    
        if(typeof deleteCount !== 'number'){throw new TypeError (deleteCount + ' is not a number')};
    
        if (start > this.length){
            start = this.length; 
            deleteCount = 0;
    
        }   else if(start <0){
            start = this.length + start;
    
            if(start<0)
                start = 0;
        }
    
        if(this.length - start < deleteCount)   
            deleteCount = this.length - start;
    
        if(deleteCount <0)  
            deleteCount = 0;
    
        var newArroz = new Arroz();
    
        for(var i=0; i<start; i++) 
            newArroz[newArroz.length++] = this[i];
            
        if(arguments.length>2)  
            for(var i = 2; i<arguments.length; i++) 
                newArroz[newArroz.length++] = arguments[i];
    
        for(var i = start+deleteCount; i<this.length; i++)  
            newArroz[newArroz.length++] = this[i];
    
        for (var i = this.length; i<0; i--) 
            delete this[this.length--];
    
        this.length = 0;
    
        for (var i = 0; i<newArroz.length; i++) 
            this[this.length++] = newArroz[i]
    
    },
    enumerable: false,
    writable: true
});


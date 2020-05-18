Arroz.prototype.slice = function(start, deleteCount, ...items){
    if(start < 0) start = this.length + -start;
    if(start < 0) start = 0;
    if(typeof deleteCount === "undefined" || deleteCount > this.length - start) deleteCount = this.length;
    for(var i = start; i < deleteCount; i++) {
        delete this[i];
    }
}

Arroz.prototype.slice = function(start, deleteCount, ...items){
    
    if(start < 0) start = this.length + -start;
    if(start < 0) start = 0;
    if(typeof deleteCount === "undefined" || deleteCount > this.length - start) deleteCount = this.length;
    
    if(arguments.length > 2){
        for(var i = start; i < deleteCount; i++) {
            delete this[i];
        }
    }else{
        
        for(var i = 0; i < items.length;i++){
            this[start] = items[i];
            start++;
        }
    }  
}
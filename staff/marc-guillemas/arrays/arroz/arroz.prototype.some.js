Arroz.prototype.some = function(callback){
    if(typeof callback !== "function") throw new TypeError(`${callback} is not a function`) 
        
    
    for(var i in this){
        if(callback(this[i])) return true; 
        
    }
    return false;
}
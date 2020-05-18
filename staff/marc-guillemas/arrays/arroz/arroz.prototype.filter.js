Arroz.prototype.filter = function(callback){
    if(typeof callback !== 'function') throw new TypeError (callback + " is not a function");

    var filtered = [];

    for(var i in this){
        
        if(callback(this[i], i, this)){
            filtered[filtered.length] = this[i];
        }             
    }
    
    return filtered;
}
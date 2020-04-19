Arroz.prototype.find= function(element) {
    if(!(element instanceof Function)) throw new TypeError(element +" is not a function")
    for (var i = 0; i < array.length; i++) {
        if(element(array[i],i,array)){
            return array[i];
        }
        
    }
}
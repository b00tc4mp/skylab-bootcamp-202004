Arroz.prototype.findIndex = function(callback){
     if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function') 
        for (var i = 0; i < this.length; i++){
            if(callback(this[i])){
                return i
            }
        }
   
    
return -1
}